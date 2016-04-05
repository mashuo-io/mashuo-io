import {FeedbackModel} from './feedback.model';
import config from '../../config/config';
import {checkRouteError} from '../shared/util';
import v from 'validate-obj';
import _ from 'lodash';

export function * getFeedbacks() {
	checkRouteError(this, {
		refId: [v.isObjectId, v.required],
		refType: [v.isIn(config.likeableRefTypes), v.required],
		feedbackType: v.isIn(['like', 'comment'])
	}, this.params);
	let {refId, refType, feedbackType} = this.params;
	let feedbacks = yield FeedbackModel.find(
		Object.assign({refId, refType}, feedbackType ? {type: feedbackType} : {}),
		{ refId:0, createdOn: 0, __v: 0, refType:0})
	.sort({likes: -1})
	.populate('user', 'github.avatarUrl github.login')
	.lean();
	feedbacks = feedbacks.map(x=> x.type === 'like' ? _.pick(x, ['_id', 'updatedOn', 'user', 'type']) : x);

	if (feedbackType) {
		this.body = feedbacks.map(omitType);
		return;
	}

	this.body = {
		likes: feedbacks.filter(x=>x.type === 'like').map(omitType),
		comments: feedbacks.filter(x=>x.type === 'comment').map(omitType)
	};
}

export function * getFeedbackStatics() {
	checkRouteError(this, {
		refId: [v.isObjectId, v.required],
		refType: [v.isIn(config.likeableRefTypes), v.required],
		feedbackType: [v.isIn(['like', 'comment'])]
	}, this.params);
	let {refId, refType, feedbackType} = this.params;
	if (feedbackType) {
		this.body = yield FeedbackModel.count({type: feedbackType, refId, refType},{ _id: 1});
		return;
	}

	this.body = {
		likes: yield FeedbackModel.count({type: 'like', refId, refType},{ _id: 1}),
		comments: yield FeedbackModel.count({type: 'comment', refId, refType},{ _id: 1})
	}
}

export function * saveFeedback() {
	checkRouteError(this, {
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
}

export function * delFeedback() {
	checkRouteError(this, {
		refId: [v.isObjectId, v.required],
		refType: [v.isIn(config.likeableRefTypes), v.required],
		feedbackType: [v.isIn(['like', 'comment']), v.required],
		_id: v.isObjectId
	}, this.params, r=> {
		let errs = [];
		if (!r.feedbackType === 'comment' && !r._id) errs.push('Must provide _id when deleting comment');
		return errs;
	});
	let {refId, refType, feedbackType, _id} = this.params;
	let deletingLike = feedbackType === 'like';

	let f = deletingLike
		? yield FeedbackModel.findOne({refId, refType, type: 'like'})
		: yield FeedbackModel.findOne({refId, refType, _id});
	if (!f) this.throw('Cannot find the record', 500);
	if (f.user.toString() !== this.currentUser._id.toString()) this.throw('Cannot delete others feedback', 403);

	let result = deletingLike
		? yield FeedbackModel.remove({refId, refType, type: 'like', user: this.currentUser._id})
		: yield FeedbackModel.remove({refId, refType, _id, user: this.currentUser._id});
	if ( result.result.n <= 0) this.throw('Cannot find the record', 500);

	if (refType === 'comment') {
		yield FeedbackModel.update({
			_id: refId,
			type: 'comment'
		}, {$inc: {likes: -1}});
	}

	this.body = {done: true};
}

const omitType = x=> _.omit(x, ['type']);