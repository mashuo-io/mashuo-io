import generateReducer from '../utils/reducer-generator';

let initState = {};

export  default generateReducer('LIKES', {
	MERGED: (state, {likes}) => Object.assign({}, state, likes.reduce((ret, {refType, refId, count}) => Object.assign(ret, {[`${refType}/${refId}`]: count}), {})),

	CHANGED: (state, {refType, refId, doLike}) => {
		let key = `${refType}/${refId}`;
		let current = state[key] || 0;
		let count = current + (doLike ? 1 : -1);
		if (count > 0) return Object.assign({}, state, {[key]: count});
		let {[key]:x, ...rest} = state;
		return rest;
	}

}, initState);


