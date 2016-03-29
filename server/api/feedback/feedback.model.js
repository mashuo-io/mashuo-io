"use strict";
let mongoose = require('mongoose');
let _=require('lodash');
let Schema = mongoose.Schema;
let config = require('../../config/config');
let baseEntity = require('../shared/base-entity');

let schema = new mongoose.Schema(_.extend({
	refType: {type: String, trim: true, enum:config.likeableRefTypes},
	refId:  {type: Schema.Types.ObjectId},
	type: {type:String, trim: true, enum: ['comment', 'like']},
	comment: {type:String, trim:true},
	user: {type: Schema.Types.ObjectId, ref:'account'},
	likes: {type: Number, default: 0}
}, baseEntity));

module.exports = mongoose.model('feedback', schema);
