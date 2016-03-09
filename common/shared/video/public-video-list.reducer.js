let initialState = {status: 'done'};
import generateReducer, {baseMapping} from '../utils/reducer-generator';

export default generateReducer('VIDEO_LIST', {
	...baseMapping,
	LOAD_VIDEOS: (state, action) => Object.assign({}, state, {videos: action.videos}),
}, initialState);