//let fetch = require('isomorphic-fetch');
let axios = require('axios');

export function loggedIn() {
    return {type: 'OAUTH.LOGGED_IN'};
}

export function loggedOut() {
    return {type: 'OAUTH.LOGGED_OUT'};
}

export function exchangeTokenByCode(code) {
    return function(dispatch) {
        //dispatch(startOauthGithubLogin());
        //setTimeout(() => {
        //    dispatch(loggedIn());
        //}, 1000);

        //fetch('http://localhost:3000/api/auth/github')

        //.then(x => x.json())
        //.then(x=> console.log('x'));
        //.then( x => {
        //    console.log('response');
        //    if (x.status == 302){
        //        console.log(x);
        //    }
        //})

        axios.get('http://localhost:3000/api/auth/github', {params: {code}})
        .then(function (response) {
            localStorage.setItem('Token', response.data);
            dispatch(loggedIn())
        })
        .catch(function (response) {
            console.log(response);
        });
    }
}

export function logout(){
    localStorage.removeItem('Token');
    return loggedOut();
}
