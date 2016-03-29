import baseEntity from '../shared/base-entity';
import mongoose from 'mongoose';
import _  from 'lodash';
import config from '../../config/config';

export const AccountModel = mongoose.model('account', new mongoose.Schema(_.extend({
	github: {
		id: {type: String, trim: true},
		email: {type: String, trim: true},
		login: {type: String, trim: true},
		avatarUrl: {type: String, trim: true}
	}
}, baseEntity)));

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

export const TokenModel = mongoose.model('token', tokenSchema);