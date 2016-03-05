//let fetch = require('isomorphic-fetch');
let axios = require('axios');

export function startOauthGithubLogin() {
    return { type: 'START_OAUTH_GITHUB'};
}

export function stopOauthGithubLogin() {
    return {type: 'FINISH_OAUTH_GITHUB'};
}

export function doOauthGithubLogin() {
    return function(dispatch) {
        //dispatch(startOauthGithubLogin());
        //setTimeout(() => {
        //    dispatch(stopOauthGithubLogin());
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

        axios.get('http://localhost:3000/api/auth/github')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });


        //window.location = 'http://localhost:3000/api/auth/github';
    }
}

export function closeGithubLogin() {
    return {type: 'AUTH.CLOSE_GITHUB_LOGIN'};
}

export function popoutGithubLogin() {
    return {type: 'AUTH.POPOUT_GITHUB_LOGIN'};
}
