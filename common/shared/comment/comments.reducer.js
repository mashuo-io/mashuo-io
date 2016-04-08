import generateReducer, {baseMapping} from '../utils/reducer-generator';
import {getRefKey, arrayToObj} from '../utils/misc';

let initialState = {};

export default generateReducer('COMMENTS', {
	LOADED: (state, {refType, refId, comments}) => Object.assign({}, state, {
		[getRefKey({refType, refId})]: {
			comments: comments.map(({_id, user:{github}, comment, updatedOn})=>({_id, comment, avatarUrl: github.avatarUrl, author: github.login, updatedOn}))
		}
	}),
	ADDED: (state, {refType, refId, _id, comment, user:{github}, updatedOn}) =>{
		let key = getRefKey({refType, refId});
		let commentsObj = state[key] || {comments: []};
		let newCommentObj = Object.assign({}, commentsObj, {
			comments: [...commentsObj.comments, {_id, comment, avatarUrl: github.avatarUrl, author: github.login, updatedOn}]
		});

		return Object.assign({}, state, {[key]: newCommentObj});
	},
	TOGGLE_REPLY_FORM: (state, {refType, refId, _id}) => {
		let key = getRefKey({refType, refId});
		let commentsObj = state[key] || {comments: []};
		let newCommentsObj = Object.assign({}, commentsObj, {
			active: commentsObj.active === _id ? null : _id
		});
		return Object.assign({}, state, {[key]: newCommentsObj});
	}
}, initialState);