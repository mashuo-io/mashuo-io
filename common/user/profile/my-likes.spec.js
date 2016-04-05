import {expect} from 'chai';
import reducer from './my-likes.reducer';
import * as actions from './my-likes.action';
import {testReducer} from '../../shared/utils/tools.spec';

let cases = [
	{
		before: undefined,
		action: actions.myLikesLoaded([{refType:'course', refId: '01'}, {refType: 'comment', refId: '02'}]),
		after: {[`course/01`]: true, [`comment/02`]: true}
	},
	{
		before: {[`course/01`]: true, [`comment/02`]: true},
		action: actions.myLikeChanged({refType: `course`, refId: '01', like: false}),
		after: {[`comment/02`]: true}
	},
	{
		before: {[`course/01`]: true, [`comment/02`]: true},
		action: actions.myLikeChanged({refType: `course`, refId: '02', like: false}),
		after: {[`course/01`]: true, [`comment/02`]: true}
	},
	{
		before: {[`comment/02`]: true},
		action: actions.myLikeChanged({refType: `course`, refId: '01', like: true}),
		after: {[`course/01`]: true, [`comment/02`]: true}
	}
];

describe('my-like', ()=>{
	it('test reducer', () => {
		testReducer(reducer, cases);
	});
});