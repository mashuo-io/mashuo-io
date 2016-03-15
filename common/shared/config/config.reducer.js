import generateReducer from '../utils/reducer-generator';
import initState from './init-state';

export default generateReducer('CONFIG', {
	LOAD: (state, action) => Object.assign({}, state, action.config)
}, initState);