'use strict';
let baseEntity = require('../shared/base-entity');
let mongoose = require('mongoose');
let _ = require('lodash');
let config = require('../../config/config');

let accountSchema = new mongoose.Schema(_.extend({
	github: {
		id: {type: String, trim: true},
		email: {type: String, trim: true},
		login: {type: String, trim: true},
		avatarUrl: {type: String, trim: true}
	}
}, baseEntity));

let accountModel = mongoose.model('account', accountSchema);

let tokenSchema = new mongoose.Schema({
	token: {type: String, trim: true},
	accountId: {type: mongoose.Schema.Types.ObjectId},
	expireAt: {
		type: Date, required: true, default: function () {
			return new Date(new Date().valueOf() + config.defaultTokenTtl * 1000);
		}
	}
});

tokenSchema.index({expireAt: 1}, {expireAfterSeconds: 0});
let tokenModel = mongoose.model('token', tokenSchema);

module.exports = {accountModel, tokenModel};