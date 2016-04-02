import uuid from 'uuid';

// added clientId to auth state, in order to allow user have a client identification in event sent to server before login in.
const CLIENT_ID = 'ClientId';
let clientId = sessionStorage.getItem(CLIENT_ID);
if (!clientId) {
	clientId = uuid.v4();
	sessionStorage.setItem(CLIENT_ID, clientId);
}

const authInitialState = {
	clientId,
    isLoggedIn: false,
    avatarUrl: '',
    email: '',
    loginName: ''
};

export default function(state = authInitialState, action) {
    if ( !action ) return state;
	let {avatarUrl, email, loginName, type} = action;

    switch(type) {
        case 'OAUTH.LOGGED_IN':
            return Object.assign({}, state, {isLoggedIn: true, avatarUrl, email, loginName});
        case 'OAUTH.LOGGED_OUT':
            return Object.assign({}, state, {isLoggedIn: false});
        default:
             return state;
    }
}