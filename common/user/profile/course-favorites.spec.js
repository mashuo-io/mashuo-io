import {expect} from 'chai';
import reducer from './course-favorites.reducer';
import * as actions from './course-favorites.action';
import {Map, is, fromJS} from 'immutable';
import {testReducerUsingImmutableJs} from '../../shared/utils/tools.spec';

let cases = [
	{
		before: undefined,
		action: actions.courseFavoritesLoaded({'01': {videos: {'a': true}}}),
		after: {'01': {videos: {'a': true}}}
	},
	{
		before: {'01': {}},
		action: actions.courseFavoriteVideoToggled({videoId: 'a', courseId: '01'}),
		after: {'01': {videos: {'a': true}}}
	},
	{
		before: {'01': {videos: {'a': true}}},
		action: actions.courseFavoriteVideoToggled({videoId: 'a', courseId: '01'}),
		after: {'01': {videos: {'a': false}}}
	}
];

describe('course-favorites', ()=>{
	it('test reducer', () => {
		testReducerUsingImmutableJs(reducer, cases);
	});
});