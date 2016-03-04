const authInitialState = {
    isFetching: false
};

export default function(state = authInitialState, action) {
    switch(action.type) {
        case 'START_OAUTH_GITHUB':
            return true;
        case 'STOP_OAUTH_GITHUB':
            return false;
        default:
            console.log('get default',action.type);
            return state;
    }
}