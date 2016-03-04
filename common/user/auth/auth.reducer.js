const authInitialState = {
    isFetching: false
};

export default function(state = authInitialState, action) {
    switch(action.type) {
        case 'START_OAUTH_GITHUB':
            return {isFetching: true};
        case 'FINISH_OAUTH_GITHUB':
            return {isFetching: false};
        default:
            return state;
    }
}