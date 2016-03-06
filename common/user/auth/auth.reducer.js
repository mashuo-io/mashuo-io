const authInitialState = {
    isLoggedIn: false
};

export default function(state = authInitialState, action) {
    switch(action.type) {
        case 'OAUTH.LOGGED_IN':
            return Object.assign({}, state, {isLoggedIn: true});
        case 'OAUTH.LOGGED_OUT':
            return Object.assign({}, state, {isLoggedIn: false});
        default:
             return state;
    }
}