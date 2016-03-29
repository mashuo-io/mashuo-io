'use strict';
let FeedbackModel = require('./feedback.model');
let config = require('../../config/config');
let util = require('../shared/util');
let v = require('validate-obj');
let _ = require('lodash');

module.exports = {
	getFeedbacks: function *() {
		util.checkRouteError(this, {
			refId: [v.isObjectId, v.required],
			refType: [v.isIn(config.likeableRefTypes)]
		}, this.params);

		let feedbacks = yield FeedbackModel.find({refId: this.params.refId, refType: this.params.refType},
			{ refId:0, createdOn: 0, __v: 0, refType:0})
		.sort({likes: -1})
		.populate('user', 'github.avatarUrl github.login')
		.lean();

		this.body = {
			likes: feedbacks.filter(x=>x.type === 'like').map(x=>  _.pick(x, ['_id', 'updatedOn', 'user'])),
			comments: feedbacks.filter(x=>x.type === 'comment').map(x=>_.omit(x, ['type']))
		}
	},
	
	getFeedbackStatics: function *() {
		util.checkRouteError(this, {
			refId: [v.isObjectId, v.required],
			refType: [v.isIn(config.likeableRefTypes)]
		}, this.params);
		this.body = {
			likes: yield FeedbackModel.count({type: 'like', refId: this.params.refId, refType: this.params.refType},{ _id: 1}),
			comments: yield FeedbackModel.count({type: 'comment', refId: this.params.refId, refType: this.params.refType},{ _id: 1})
		}
	},
	
	saveFeedback: function *() {
		util.checkRouteError(this, {
			refId: [v.isObjectId, v.required],
			refType: [v.isIn(config.likeableRefTypes)],
			type: v.isIn(['comment', 'like'])
		}, this.params, r=> {
			let errs = [];
			if (this.params.type !== 'like' && this.refType === 'comment') errs.push('We can only like comment');
			return errs;
		});
		let requestBody = this.request.body || {};
		if (this.params.type === 'comment' && !requestBody.comment) this.throw('comment is required', 500);
		
		
		if (this.params.type === 'like') { // like can only happen once
			
			let feedback = yield FeedbackModel.findOne({
				refType: this.params.refType,
				refId: this.params.refId,
				user: this.currentUser._id,
				type: 'like'
			}, {_id: 1});
			
			if (feedback) {
				this.body = {_id: feedback._id};
				return;
			}
			
			if (this.params.refType==='comment') {
				yield FeedbackModel.update({
					_id: this.params.refId,
					type: 'comment'
				}, {$inc: {likes: 1}});
			}
		}
		
		let newFeedback = yield new FeedbackModel({
			refId: this.params.refId,
			refType: this.params.refType,
			user: this.currentUser._id,
			type: this.params.type,
			comment: requestBody.comment
		}).save();
		
		this.body = {_id: newFeedback._id};
	},
	
	delFeedback: function *() {
		util.checkRouteError(this, {
			refId: [v.isObjectId, v.required],
			refType: [v.isIn(config.likeableRefTypes)]
		}, this.params);
		
		let f = yield FeedbackModel.findOne({refId: this.params.refId, refType: this.params.refType, _id: this.params._id});
		if (!f) this.throw('Cannot find the record', 500);
		if (f.user.toString() !== this.currentUser._id.toString()) this.throw('Cannot delete others feedback', 403);
		
		let result = yield FeedbackModel.remove({refId: this.params.refId, refType: this.params.refType, _id: this.params._id, user: this.currentUser._id});
		if ( result.result.n <= 0) this.throw('Cannot find the record', 500);
		
		if (this.params.refType === 'comment') {
			yield FeedbackModel.update({
				_id: this.params.refId,
				type: 'comment'
			}, {$inc: {likes: -1}});
		}
		
		this.body = {done: true};
	}
};