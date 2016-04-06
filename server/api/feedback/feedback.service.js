import {FeedbackModel, FeedbackStatModel} from './feedback.model';
import config from '../../config/config';
import {checkRouteError} from '../shared/util';
import v from 'validate-obj';
import _ from 'lodash';
import {publish} from '../shared/bus'
import './feedback.handler';

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

	let likes = feedbacks.filter(x=>x.type === 'like').map(x=> _.pick(x, ['_id', 'updatedOn', 'user']));
	let comments = feedbacks.filter(x=>x.type === 'comment').map(x=> _.omit(x, ['type']));
	let commentsLikes = yield FeedbackStatModel.find({refType: 'comment', refId: {$in: comments.map(x=>x._id)}}, {_id: 0, refId:1, likes: 1}).lean();
	comments = comments.map(x=>({...x, likes: (commentsLikes.find(y=>y.refId.toString() == x._id.toString()) || {}).likes || 0 }));

	if (feedbackType) {
		this.body = feedbackType === 'comment' ? comments : likes;
		return;
	}

	this.body = {likes,	comments};
}

export function * getFeedbackStatics() {
	checkRouteError(this, {
		refId: [v.isObjectId, v.required],
		refType: [v.isIn(config.likeableRefTypes), v.required],
		feedbackType: [v.isIn(['like', 'comment'])]
	}, this.params);
	let {refId, refType, feedbackType} = this.params;

	let stat = (yield FeedbackStatModel.findOne({refId, refType}, {likes:1, comments:1, _id:0}).lean()) || {likes: 0, comments: 0};

	if (feedbackType) {
		this.body = feedbackType === 'comment' ? stat.comments : stat.likes;
		return;
	}

	this.body = stat;
}

export function * saveFeedback() {
	checkRouteError(this, {
		refId: [v.isObjectId, v.required],
		refType: [v.isIn(config.likeableRefTypes)],
		type: v.isIn(['comment', 'like'])
	}, this.params, r=> {
		let errs = [];
		if (r.type !== 'like' && r.refType === 'comment') errs.push('We can only like comment');
		return errs;
	});
	let {refType, refId, type: feedbackType} = this.params;

	let requestBody = this.request.body || {};
	if (feedbackType === 'comment' && !requestBody.comment) this.throw('comment is required', 500);


	if (feedbackType === 'like') { // like can only happen once

		let feedback = yield FeedbackModel.findOne({
			refType,
			refId,
			user: this.currentUser._id,
			type: 'like'
		}, {_id: 1});

		if (feedback) {
			this.body = {_id: feedback._id};
			return;
		}
	}

	let newFeedback = yield new FeedbackModel({
		refId: refId,
		refType: refType,
		user: this.currentUser._id,
		type: feedbackType,
		comment: requestBody.comment
	}).save();

	this.body = {_id: newFeedback._id};

	publish('feedback-changed', {refType, refId, feedbackType, mode: 'add'})
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

	this.body = {done: true};

	publish('feedback-changed', {refType, refId, feedbackType, mode: 'remove'})
}

const omitType = x=> _.omit(x, ['type']);