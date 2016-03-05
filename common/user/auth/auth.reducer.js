const authInitialState = {
    isFetching: false,
    isPoppedOut: false
};

export default function(state = authInitialState, action) {
    switch(action.type) {
        case 'START_OAUTH_GITHUB':
            return Object.assign({}, state, {isFetching: true});
        case 'FINISH_OAUTH_GITHUB':
            return Object.assign({}, state, {isFetching: true});
        case 'AUTH.POPOUT_GITHUB_LOGIN':
            return Object.assign({}, state, {isPoppedOut: true});
        case 'AUTH.CLOSE_GITHUB_LOGIN':
            return Object.assign({}, state, {isPoppedOut: false});
        default:
            return state;
    }
}