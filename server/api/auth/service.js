import uuid from 'uuid';
import request from 'co-request';
import config from '../../config/config';
import {AccountModel} from './model';
import {TokenModel} from './model';

function getBearerToken(header, throwException) {
	let groups = /^\s*(\w+)\s+(\S+)(\s+(\S+)\s*)?$/.exec(header);
	if (!groups) throwException(401, 'authentication failed, no bearer token found');

	let [, schema, tokenId, clientId] = groups;
	if (schema !== 'Bearer') throwException(401, 'authentication failed, schema failed, only support Bearer');

	return {tokenId, clientId};
}

export function * oauthGithub() {
	let params = {
		code: this.query.code,
		client_id: '34de227893b92e96f645',
		client_secret: '5a6250dfcefb1e861d8c761c3948a92a5262e4be',
		redirect_uri: 'http://127.0.0.1:8080/oauthback.html'
	};

	// Get access_token
	let result = yield request.get({
		url: 'https://github.com/login/oauth/access_token',
		qs: params,
		json: true
	});

	//Get user information by access_token
	result = yield request.get({
		url: 'https://api.github.com/user',
		qs: {access_token: result.body.access_token},
		headers: {'User-Agent': 'Mashuo'},
		json: true
	});

	let githubProfile = result.body;

	// find if this user already registered
	let account = yield AccountModel.findOne({'github.id': githubProfile.id});
	if (!account) {
		account = yield new AccountModel({
			github: {
				id: githubProfile.id,
				email: githubProfile.email,
				login: githubProfile.login,
				avatarUrl: githubProfile.avatar_url
			}
		}).save();
	}

	// If token exists, update the expired time, otherwise create new one
	let token = yield TokenModel.findOne({accountId: account._id});
	if (!token) {
		token = yield new TokenModel({
			token: uuid.v4(),
			accountId: account._id
		}).save();
	}
	else {
		token = yield TokenModel.findOneAndUpdate(
			{_id: token._id},
			{
				expireAt: new Date(new Date().valueOf() + config.defaultTokenTtl * 1000)
			},
			{new: true}
		)
	}

	this.body = {
		token: token.token,
		avatarUrl: account.github.avatarUrl,
		email: account.github.email,
		loginName: account.github.login
	};
}

export function * getAccountInfo() {
	this.body = {
		avatarUrl: this.currentUser.github.avatarUrl,
		email: this.currentUser.github.email,
		loginName: this.currentUser.github.login
	}
}

export function* authenticateTokenMiddleware(next) {
	let {tokenId, clientId} = getBearerToken(this.headers.authorization || this.headers.Authorization, this.throw);

	let tokenRecord = yield TokenModel.findOne({token: tokenId}).lean();
	if (!tokenRecord) this.throw('Unauthorized', 401);

	this.currentUser = yield AccountModel.findOne({_id: tokenRecord.accountId}).lean();
	if (!this.currentUser) throw('user NOT found', 401);

	this.currentUser.clientId = clientId;
	yield next;
}