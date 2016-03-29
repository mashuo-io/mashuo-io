"use strict";
let mongoose = require('mongoose');
let _=require('lodash');
let Schema = mongoose.Schema;
let config = require('../../config/config');
let baseEntity = require('../shared/base-entity');

let schema = new mongoose.Schema(_.extend({

	watched: {
		courses:[{type: Schema.Types.ObjectId, ref:'course'}],
		videos: [{type: Schema.Types.ObjectId}]
	},
	liked: {
		courses: [{type: Schema.Types.ObjectId, ref:'course'}],
		videos: [{type: Schema.Types.ObjectId}]
	}
}, 0));

module.exports = mongoose.model('profile', schema);
