let initialState = {status: 'doing'};
import generateReducer, {baseMapping} from '../utils/reducer-generator';

export default generateReducer('VIDEO', {
	...baseMapping,
	LOAD_VIDEO: (state, action) => Object.assign({}, state, {video: action.video})
}, initialState);