import generateReducer, {baseMapping} from '../utils/reducer-generator';

export default generateReducer('MY_VIDEO', {
	...baseMapping,
	LOAD_VIDEOS: (state, action) => Object.assign({}, state, {videos: action.videos})
}, {})