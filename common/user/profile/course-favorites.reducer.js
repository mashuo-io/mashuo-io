import generateReducer from '../../shared/utils/reducer-generator';
import {o} from '../../shared/utils/misc';
import {Map, fromJS} from 'immutable';

let initState = fromJS({});

export  default generateReducer('COURSE_FAVORITES', {

	LOADED: (state, action) => fromJS(action.courseFavorites),

	VIDEO_TOGGLED: (state, {courseId, videoId}) =>
		state.updateIn([courseId, 'videos', videoId], false, v=>!v)
}, initState);