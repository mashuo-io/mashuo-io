let initialState = {isFetching: false, videos: []};

export default function(state = initialState, action) {
	switch(action.type) {
		case 'VIDEO.START_FETCHING':
			return Object.assign({}, state, {isFetching: true});
		case 'VIDEO.FINISH_FETCHING':
			return Object.assign({}, state, {isFetching: false, videos: action.videos});
		default:
			return state;
	}
}