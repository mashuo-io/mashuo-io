import axios from '../../shared/utils/server-request.service';
import {browserHistory} from 'react-router'

export function loggedOut() {
    return {type: 'OAUTH.LOGGED_OUT'};
}

export function loggedIn(avatarUrl, email, loginName) {
    return {type: 'OAUTH.LOGGED_IN', avatarUrl, email, loginName};
}
//
//export function exchangeTokenByCode(code) {
//    return function(dispatch) {
//
//        axios.get('/auth/github', {params: {code}})
//        .then(function (response) {
//            console.log(response.data);
//            localStorage.setItem('Token', response.data.token);
//            dispatch(loggedIn(response.data.avatarUrl, response.data.email,response.data.loginName));
//        })
//        .catch(function (response) {
//        });
//    }
//}

export function logout(){
    localStorage.removeItem('Token');
    return loggedOut();
}


export function findTokenAndLogin() {
    return function(dispatch) {
        let token = localStorage.getItem('Token');

        if( !token ) {
            return ;
        }

        axios.get('/auth/account')
        .then(function (response) {
            dispatch(loggedIn(response.data.avatarUrl, response.data.email,response.data.loginName));
        })
        .catch(function (response) {
        });
    }
}

export function oauthReturn(res) {
    if( res.status === 200) {
        localStorage.setItem('Token', res.data.token);
        return {type: 'OAUTH.LOGGED_IN', ...res.data};
    }

    return {type:''};
}