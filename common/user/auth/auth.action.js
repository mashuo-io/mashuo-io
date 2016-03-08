import axios from 'axios';
import {browserHistory} from 'react-router'

axios.interceptors.request.use(function (config) {
    let isAbsoluteURLRegex = /^(?:\w+:)\/\//;

    if ( !isAbsoluteURLRegex.test(config.url) ) {
        config.url = 'http://localhost:3000/api' + config.url;
    }

    if (/.json$/.test(config.url) || /.html$/.test(config.url)) return config;

    config.headers['Authorization'] = `Bearer ${localStorage.getItem('Token')}`;

    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    switch(error.status)
    {
        case 401:
        case 403:
            browserHistory.push('/auth');
            break;
    }

    return Promise.reject(error);
});

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