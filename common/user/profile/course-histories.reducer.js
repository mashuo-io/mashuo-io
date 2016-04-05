import generateReducer from '../../shared/utils/reducer-generator';

let initState = {};

export  default generateReducer('COURSE_HISTORIES', {

	LOADED: (state, action) => action.courseHistories || {},

	VIDEO_CHANGED: (state, {courseId, videoId, status, durationWatched}) => {
		let courseHistory = state[courseId] || {durationWatched:0, videos:{}};
		let newVideos = Object.assign({}, courseHistory.videos, {[videoId]: {status, durationWatched}});
		let newCourseHistory = {
			durationWatched: Object.keys(newVideos).reduce((ret, key)=> ret + newVideos[key].durationWatched, 0),
			videos: newVideos
		};
		return Object.assign({}, state, {[courseId]: newCourseHistory});
	}
}, initState);