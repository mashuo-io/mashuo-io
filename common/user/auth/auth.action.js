import axios from 'axios';
import {browserHistory} from 'react-router'

axios.interceptors.request.use(function (config) {
    let isAbsoluteURLRegex = /^(?:\w+:)\/\//;

    if ( !isAbsoluteURLRegex.test(config.url) ) {
        config.url = 'http://localhost:3000' + config.url;
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

console.log(axios.interceptors.response);

export function loggedIn() {
    return {type: 'OAUTH.LOGGED_IN'};
}

export function loggedOut() {
    return {type: 'OAUTH.LOGGED_OUT'};
}

export function exchangeTokenByCode(code) {
    return function(dispatch) {

        //axios.get('http://localhost:3000/api/auth/github', {params: {code}})
        axios.get('/api/auth/github', {params: {code}})
        .then(function (response) {
            localStorage.setItem('Token', response.data);
            dispatch(loggedIn())
        })
        .catch(function (response) {
        });
    }
}

export function logout(){
    localStorage.removeItem('Token');
    return loggedOut();
}
