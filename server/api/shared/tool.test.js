"use strict";

let mongoose = require('mongoose');
let _ = require('lodash');
let AccountModel = require('../auth/model').AccountModel;
let TokenModel = require('../auth/model').TokenModel;
let co = require('co');
let uuid = require('uuid');

let app= require('../../index');
let request = require("supertest-as-promised").agent(app.listen());

var mocha = require('mocha');
var coMocha = require('co-mocha');
coMocha(mocha);

module.exports = {

	cleanDb: () => {
		let promises = _.map(mongoose.models, function (m) {
			return new Promise(function (resolve) {
				m.collection.remove({}, resolve);
			});
		});

		return Promise.all(promises);
	},

	mockGithubLogin: (githubId) => {
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
	},

	saveCourse: function * (course) {
		let a = yield this.mockGithubLogin('g');
		let token = a.token;
		return request.post('/api/my-courses')
		.set('Authorization', `Bearer ${token}`)
		.send(course)
		.expect(200)
		.then(res=>res.body._id);
	}
};