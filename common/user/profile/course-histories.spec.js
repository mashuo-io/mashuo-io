import {expect} from 'chai';
import reducer from './course-histories.reducer';
import * as actions from './course-histories.action';
import {testReducerUsingImmutableJs} from '../../shared/utils/tools.spec';

let cases = [
	{
		before: undefined,
		action: actions.courseHistoriesLoaded({'01': {videos: {'a': true}}}),
		after: {'01': {videos: {'a': true}}}
	},
	{
		before: {'01': {durationWatched: 10, videos: {'a': {durationWatched: 10, status: 'watching'}}}},
		action: actions.courseHistoryVideoChanged({courseId: '01', videoId: 'a', status: 'watching', durationWatched: 20}),
		after: {'01': {durationWatched: 20, videos: {'a': {durationWatched: 20, status: 'watching'}}}}
	}
];

describe('course-histories', ()=>{
	it('test reducer', () => {
		testReducerUsingImmutableJs(reducer, cases);
	});
});