let initialState = {status: 'doing'};
import generateReducer, {baseMapping} from '../utils/reducer-generator';

export default generateReducer('COURSE', {
	...baseMapping,
	LOAD_COURSE: (state, action) => Object.assign({}, state, {course: action.course})
}, initialState);