import axios from '../../shared/utils/server-request.service';
import {loadCourseHistories} from '../profile/course-histories.action';
import {loadcourseFavorites} from '../profile/course-favorites.action';
import {loadMyLikes} from '../profile/my-likes.action';

export function loggedOut() {
    return {type: 'OAUTH.LOGGED_OUT'};
}

export function loggedIn(avatarUrl, email, loginName) {
    return {type: 'OAUTH.LOGGED_IN', avatarUrl, email, loginName};
}

export function logout(){
    localStorage.removeItem('Token');
    return loggedOut();
}

export const findTokenAndLogin = () => dispatch => {
	let token = localStorage.getItem('Token');
	if (token) {
		axios.get('/auth/account')
		.then(response=>response.data)
		.then(data => dispatch(loggedIn(data.avatarUrl, data.email, data.loginName)))
		.then(()=>getProfiles(dispatch));
	}
};

export const oauthReturn = ({status, data: {avatarUrl, email, loginName, token}}) => dispatch => {
    if( status !== 200) return {type:''};
    localStorage.setItem('Token', token);
	dispatch(loggedIn(avatarUrl, email, loginName));

	getProfiles(dispatch);
};

const getProfiles = dispatch => {
	dispatch(loadcourseFavorites());
	dispatch(loadCourseHistories());
	dispatch(loadMyLikes());
};