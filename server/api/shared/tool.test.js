"use strict";

let mongoose = require('mongoose');
let _ = require('lodash');
let AccountModel = require('../auth/model').accountModel;
let TokenModel = require('../auth/model').tokenModel;
let co = require('co');
let uuid = require('uuid');

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

	mochaGithubLogin: (githubId) => {
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
	}
};