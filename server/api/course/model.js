"use strict";

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let baseEntity = require('../shared/base-entity');
let _ = require('lodash');

let schema = new mongoose.Schema(_.extend({
	name: String,
	description: String,
	createdBy: {type:Schema.Types.ObjectId, ref:'account'},
	videos: [
		{
			name: String,
			url: String,
			duration: Number
		}
	],
	status: {type: String, enum: ['new', 'published']}
}, baseEntity));

module.exports = {
	courseModel: mongoose.model('course', schema)
};