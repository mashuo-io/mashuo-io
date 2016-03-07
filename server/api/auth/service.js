'use strict';
let uuid = require('uuid');
let request = require('co-request');
let config = require('../../config/config');
let accountModel = require('./model').accountModel;
let tokenModel = require('./model').tokenModel;

function getBearerToken(header, throwException) {
	let groups = /^\s*(\w+)\s+(\S+)\s*$/.exec(header);
	if (!groups) throwException(401, 'authentication failed, no bearer token found');

	let schema = groups[1], tokenId = groups[2];
	if (schema !== 'Bearer') throwException(401, 'authentication failed, schema failed, only support Bearer');

	return tokenId;
}

module.exports = {
	oauthGithub: function* () {
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
		let account = yield accountModel.findOne({'github.id': githubProfile.id});
		if (!account) {
			account = yield new accountModel({
				github: {
					id: githubProfile.id,
					email: githubProfile.email,
					login: githubProfile.login,
					avatarUrl: githubProfile.avatar_url
				}
			}).save();
		}

		console.log(account);

		// If token exists, update the expired time, otherwise create new one
		let token = yield tokenModel.findOne({accountId: account._id});
		if (!token) {
			token = yield new tokenModel({
				token: uuid.v4(),
				accountId: account._id
			}).save();
		}
		else {
			token = yield tokenModel.findOneAndUpdate(
				{_id: token._id},
				{
					expireAt: new Date(new Date().valueOf() + config.defaultTokenTtl * 1000)
				},
				{new: true}
			)
		}

		console.log(token);

		this.body = token.token;
	},

	authenticateTokenMiddleware: function* (next) {
		let tokenInHeader = getBearerToken(this.headers.authorization || this.headers.Authorization, this.throw);

		let token = yield tokenModel.findOne({token: tokenInHeader});

		if (!token) this.throw('Unauthorized', 401);
		this.currentUser = yield accountModel.findOne({_id: token.accountId});
		yield next;
	}
};