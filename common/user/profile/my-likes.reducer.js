import generateReducer from '../../shared/utils/reducer-generator';

let initState = {};

export  default generateReducer('MY_LIKES', {

	LOADED: (state, action) => action.likes.reduce((ret, {refType, refId})=> Object.assign(ret, {[getKey({refType, refId})]: true}), {}),

	CHANGED: (state, {refType, refId, doLike}) => {
		let key = getKey({refType, refId});
		if (doLike) return Object.assign({}, state, {[key]: true});

		let {[key]:x, ...deleted} = state;
		return deleted;
	},
	CLEAN: state => initState
}, initState);

export const getKey = ({refType, refId}) => `${refType}/${refId}`;