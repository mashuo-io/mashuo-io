import axios from '../utils/server-request.service';
import {mergeLikes} from '../like/likes.action';

export const loadComments = ({refType, refId}) => dispatch =>
	axios.get(`/${refType}/${refId}/feedbacks/comment`)
	.then(x=>x.data)
	.then(data=> {
		dispatch(commentsLoaded({comments:data, refType, refId}));
		dispatch(mergeLikes(data.map(x=>({refType:'comment', refId: x._id, count: x.likes}))));
	});


export const commentsLoaded = ({comments, refType, refId}) => ({
	type: 'COMMENTS.LOADED',
	comments, refType, refId
});

export const commentAdded = ({comment, refType, refId, _id, user, updatedOn}) => ({
	type: 'COMMENTS.ADDED',comment, refType, refId, _id, user, updatedOn
});

export const toggleReplyForm = ({refType, refId, _id}) => ({
	type: 'COMMENTS.TOGGLE_REPLY_FORM', refType, refId, _id
});

export const addComment = ({comment, refType, refId, replyId}, after) => dispatch =>
	axios.post(`/${refType}/${refId}/feedbacks/comment`, {comment})
	.then(({data: {user, updatedOn, _id}})=> {
		dispatch(commentAdded({comment, refType, refId, user, updatedOn, _id}));
		dispatch(toggleReplyForm({refType, refId, _id: replyId}));
		after();
	});