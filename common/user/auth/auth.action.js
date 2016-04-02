import axios from '../../shared/utils/server-request.service';
import {browserHistory} from 'react-router'

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
	}
};

export function oauthReturn({status, data: {avatarUrl, email, loginName, token}}) {
    if( status === 200) {
        localStorage.setItem('Token', token);
        return {type: 'OAUTH.LOGGED_IN', avatarUrl, email, loginName};
    }
    return {type:''};
}