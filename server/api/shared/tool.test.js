import "babel-polyfill";
import mongoose from 'mongoose';
import _ from 'lodash';
import {AccountModel} from '../auth/model';
import {TokenModel} from '../auth/model';
import co from 'co';
import uuid  from 'uuid';

let app= require('../../index');
let request = require("supertest-as-promised").agent(app.listen());

var mocha = require('mocha');
var coMocha = require('co-mocha');
coMocha(mocha);


export const cleanDb = () => {
	let promises = _.map(mongoose.models, function (m) {
		return new Promise(function (resolve) {
			m.collection.remove({}, resolve);
		});
	});

	return Promise.all(promises);
};

export const mockGithubLogin = (githubId) => {
	return co(function *() {
		let account = yield new AccountModel({
			github: {
				id: githubId,
				email: `${githubId}@example.com`,
				login: githubId,
				avatarUrl: `${githubId}.jpg`
			}
		}).save();

		let token = yield new TokenModel({
			token: uuid.v4(),
			accountId: account._id
		}).save();

		return {accountId: account._id, token: token.token};
	})
};

export function * saveCourse(course) {
	let a = yield mockGithubLogin('g');
	let token = a.token;
	return request.post('/api/my-courses')
	.set('Authorization', `Bearer ${token}`)
	.send(course)
	.expect(200)
	.then(res=>res.body._id);
}

export function * sleep(ms) {
	yield new Promise((resolve)=>setTimeout(()=>resolve(), ms));
}

