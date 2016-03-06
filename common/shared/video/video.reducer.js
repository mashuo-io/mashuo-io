let initialState = {isFetching: false};
import generateReducer from '../utils/reducer-generator';

export default generateReducer('VIDEO', {
	'START_FETCHING': (state, action) => Object.assign({}, state, {isFetching: true}),
	'FINISH_FETCHING': (state, action) => Object.assign({}, state, {isFetching: false, videos: action.videos})
}, initialState);