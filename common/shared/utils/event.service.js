import axios from '../utils/server-request.service';

export const postEvent = (type, data) => {
	return axios.post(`/events`, {type, data});
};