let initialState = {status: 'done'};
import generateReducer, {baseMapping} from '../utils/reducer-generator';

export default generateReducer('COURSE_LIST', {
	...baseMapping,
	LOAD_COURSES: (state, action) => Object.assign({}, state, {courses: action.courses})
}, initialState);