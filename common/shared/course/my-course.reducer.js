import generateReducer, {baseMapping} from '../utils/reducer-generator';

export default generateReducer('MY_COURSE', {
	...baseMapping,
	LOAD_COURSES: (state, action) => Object.assign({}, state, {courses: action.courses})
}, {})