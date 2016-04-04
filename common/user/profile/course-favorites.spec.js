import {expect} from 'chai';
import reducer from './course-favorites.reducer';
import * as actions from './course-favorites.action';
import {testReducer} from '../../shared/utils/tools.spec';

let cases = [
	{
		before: undefined,
		action: actions.courseFavoritesLoaded({'01': {'a': true}}),
		after: {'01': {'a': true}}
	},
	{
		before: {},
		action: actions.courseFavoriteVideoToggled({videoId: 'a', courseId: '01'}),
		after: {'01': {'a': true}}
	},
	{
		before: {'01': {}},
		action: actions.courseFavoriteVideoToggled({videoId: 'a', courseId: '01'}),
		after: {'01': {'a': true}}
	},
	{
		before: {'01': {'a': true}},
		action: actions.courseFavoriteVideoToggled({videoId: 'a', courseId: '01'}),
		after: {'01': {'a': false}}
	}
];

describe('course-favorites', ()=>{
	it('test reducer', () => {
		testReducer(reducer, cases);
	});
});