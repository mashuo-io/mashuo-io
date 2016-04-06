import {expect} from 'chai';
import reducer from './likes.reducer';
import * as actions from './likes.action';
import {testReducer} from '../../shared/utils/tools.spec';

let cases = [
	{
		before: undefined,
		action: actions.mergeLikes([{refType:'course', refId: '01', count: 3}, {refType: 'comment', refId: '02', count: 5}]),
		after: {[`course/01`]: 3, [`comment/02`]: 5}
	},
	{
		before: {[`course/01`]: 3, [`comment/02`]: 5},
		action: actions.changeLike({refType: `course`, refId: '01', doLike: false}),
		after: {[`course/01`]: 2, [`comment/02`]: 5}
	},
	{
		before: {[`course/01`]: 3, [`comment/02`]: 5},
		action: actions.changeLike({refType: `course`, refId: '01', doLike: true}),
		after: {[`course/01`]: 4, [`comment/02`]: 5}
	},
	{
		before: {[`comment/02`]: 1},
		action: actions.changeLike({refType: `course`, refId: '01', doLike: true}),
		after: {[`course/01`]: 1, [`comment/02`]: 1}
	},
	{
		before: {[`comment/02`]: 1},
		action: actions.changeLike({refType: `course`, refId: '01', doLike: false}),
		after: {[`comment/02`]: 1}
	}
];

describe('my-like', ()=>{
	it('test reducer', () => {
		testReducer(reducer, cases);
	});
});