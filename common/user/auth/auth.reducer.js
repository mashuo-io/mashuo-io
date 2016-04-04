import generateReducer from '../../shared/utils/reducer-generator';
import {o} from '../../shared/utils/misc';

// added clientId to auth state, in order to allow user have a client identification in event sent to server before login in.
import uuid from 'uuid';
const CLIENT_ID = 'ClientId';
let clientId = sessionStorage.getItem(CLIENT_ID);
if (!clientId) {
	clientId = uuid.v4();
	sessionStorage.setItem(CLIENT_ID, clientId);
}

let initialState = {
	clientId,
	isLoggedIn: false,
	avatarUrl: '',
	email: '',
	loginName: ''
};

export default generateReducer('OAUTH', {
	LOGGED_IN: (state, action) => Object.assign({}, state, {isLoggedIn: true, ...action}),
	LOGGED_OUT: (state, action) => Object.assign({}, state, {isLoggedIn: false}),
	COURSE_FAVORITES_LOADED: (state, action) => Object.assign({}, state, {courseFavorites: action.courseFavorites}),
	COURSE_FAVORITE_VIDEO_TOGGLED: (state, {courseId, videoId}) => {
		let courseFavorite = state.courseFavorites[courseId];
		courseFavorite.videos = Object.assign({}, courseFavorite.videos, o(videoId, !courseFavorite.videos[videoId]));
		return state;
	}
}, initialState);