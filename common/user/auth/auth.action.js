export function startOauthGithubLogin() {
    return { type: 'START_OAUTH_GITHUB'};
}

export function stopOauthGithubLogin() {
    return {type: 'FINISH_OAUTH_GITHUB'};
}

export function doOauthGithubLogin() {
    return function(dispatch) {
        setTimeout(() => {
            // Yay! Can invoke sync or async actions with `dispatch`
            dispatch(stopOauthGithubLogin());
        }, 1000);
    }
}


