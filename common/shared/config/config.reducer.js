import generateReducer from '../utils/reducer-generator';
import initState from 'exports?appConfig!../../../app-config';

export default generateReducer('CONFIG', {
	LOAD: (state, action) => Object.assign({}, state, action.config)
}, initState);