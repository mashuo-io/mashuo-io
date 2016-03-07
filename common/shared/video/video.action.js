import {initialize} from 'redux-form';
import axios from 'axios';

export const setDoing = (prefix) => {
	return {
		type: `${prefix}.SET_DOING`
	}
};

export const setDone = (prefix) => {
	return {
		type: `${prefix}.SET_DONE`
	}
};

export const loadVideos = (prefix, videos) => {
	return {
		type: `${prefix}.LOAD_VIDEOS`,
		videos
	}
};

export const doFetchPublicVideos = () =>
	dispatch => {
		dispatch(setDoing('VIDEO'));

		axios.get('/videos')
		.then(function (response) {
			dispatch(loadVideos('VIDEO', response.data));
			dispatch(setDone('VIDEO'));
		})
		.catch(x=>{})
	};

export const doFetchMyVideos = () =>
	dispatch => {
		dispatch(setDoing('MY_VIDEO'));

		axios.get('/my-videos')
		.then(function (response) {
			dispatch(loadVideos('MY_VIDEO', response.data));
			dispatch(setDone('MY_VIDEO'));
		})
		.catch(x=>{})
	};

export const doFetchOneMyVideo = (videoId) =>
	dispatch => {
		dispatch(setDoing('MY_VIDEO'));
		axios.get(`/my-videos/${videoId}`)
		.then(response => {
			dispatch(initialize('video', response.data, ['name', 'description']));
			dispatch(setDone('MY_VIDEO'));
		})
		.catch(x=>console.log(x))

	};