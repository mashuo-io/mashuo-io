import generateReducer from '../../shared/utils/reducer-generator';

let initState = {};

export  default generateReducer('COURSE_FAVORITES', {

	LOADED: (state, action) => action.courseFavorites,

	VIDEO_TOGGLED: (state, {courseId, videoId}) => {
		let courseFavorite = state[courseId] || {};
		let newCourseFavorite = Object.assign({}, courseFavorite, {[videoId]: !courseFavorite[videoId]});
		return Object.assign({}, state, {[courseId]: newCourseFavorite});
	}
}, initState);