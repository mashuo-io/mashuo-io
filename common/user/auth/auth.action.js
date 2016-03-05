let fetch = require('isomorphic-fetch');

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

        fetch('http://localhost:3000/api/auth/github')
        .then(x=> x.json())
        .then(x=> console.log('x'));
    }
}


