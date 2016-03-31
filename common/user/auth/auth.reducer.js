import uuid from 'uuid';
const CLIENT_ID = 'ClientId';
let clientId = sessionStorage.getItem(CLIENT_ID);
if (!clientId) {
	clientId = uuid.v4();
	sessionStorage.setItem(CLIENT_ID, clientId);
};

const authInitialState = {
	clientId,
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