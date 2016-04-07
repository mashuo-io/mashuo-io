import generateReducer, {baseMapping} from '../utils/reducer-generator';
import {getRefKey, arrayToObj} from '../utils/misc';

let initialState = {};

export default generateReducer('COMMENTS', {
	LOADED: (state, {refType, refId, comments}) => Object.assign({}, state, {
		[getRefKey({refType, refId})]: comments.map(({_id, user:{github}, comment, updatedOn})=>({_id, comment, avatarUrl: github.avatarUrl, author: github.login, updatedOn}))
	}),
	ADDED: (state, {refType, refId, _id, comment, user:{github}, updatedOn}) =>{
		let key = getRefKey({refType, refId});
		let comments = state[key] || [];
		return Object.assign({}, state, {[key]: [...comments, {_id, comment, avatarUrl: github.avatarUrl, author: github.login, updatedOn}]});
	}
}, initialState);