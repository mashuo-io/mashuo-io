const authInitialState = {
    isLoggedIn: false,
    avatarUrl: '',
    email: '',
    loginName: ''
};

export default function(state = authInitialState, action) {
    if ( !action ) return state;

    switch(action.type) {
        case 'OAUTH.LOGGED_IN':
            console.log(action);
            return Object.assign({}, state, {isLoggedIn: true, avatarUrl: action.avatarUrl, email: action.email, loginName: action.loginName});
        case 'OAUTH.LOGGED_OUT':
            return Object.assign({}, state, {isLoggedIn: false});
        default:
             return state;
    }
}