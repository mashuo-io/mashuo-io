import {subscribe} from '../shared/bus';
import {FeedbackStatModel} from './feedback.model';

subscribe('feedback-changed', function * ({refType, refId, feedbackType, mode}){
	let num = mode === 'add' ? 1 : -1;
	let column = feedbackType === 'like' ? 'likes' : 'comments';
	yield FeedbackStatModel.update({refType, refId}, {
		$inc: {[column]: num},
		$setOnInsert: {createdOn: new Date, updatedOn: new Date}
	}, {upsert: true})
});