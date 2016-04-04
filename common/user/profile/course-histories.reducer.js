import generateReducer from '../../shared/utils/reducer-generator';
import {o} from '../../shared/utils/misc';
import {fromJS} from 'immutable';

let initState = fromJS({});

export  default generateReducer('COURSE_HISTORIES', {

	LOADED: (state, action) => fromJS(action.courseHistories),

	VIDEO_CHANGED: (state, {courseId, videoId, status, durationWatched}) => {
		let temp = state.withMutations(x=>x.set(courseId, x.get(courseId, fromJS({courseId, durationWatched:0, videos:{}})))
			.setIn([courseId, 'videos', videoId], fromJS({status, durationWatched})));

		let videos = temp.getIn([courseId, 'videos']);
		return temp.setIn([courseId, 'durationWatched'], videos.reduce((ret, item)=>ret + item.get('durationWatched'),0));
	}
}, initState);