const authInitialState = {
    isLoggedIn: false,
    avatarUrl: '',
    email: '',
    loginName: ''
};

export default function(state = authInitialState, action) {
    switch(action.type) {
        case 'OAUTH.LOGGED_IN':
            return Object.assign({}, state, {isLoggedIn: true, avatarUrl: action.avatarUrl, email: action.email, loginName: action.loginName});
        case 'OAUTH.LOGGED_OUT':
            return Object.assign({}, state, {isLoggedIn: false});
        default:
             return state;
    }
}