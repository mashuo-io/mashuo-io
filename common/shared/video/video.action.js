import {initialize} from 'redux-form';
import axios from 'axios';
import {fields} from './EditVideo';
import {goBack} from 'react-router-redux';

export const setDoing = (prefix) => ({
		type: `${prefix}.SET_DOING`
	});

export const setDone = (prefix) => ({
		type: `${prefix}.SET_DONE`
	});

export const loadVideos = (prefix, videos) => ({
		type: `${prefix}.LOAD_VIDEOS`,
		videos
	});

export const doFetchPublicVideos = () => dispatch => {
	dispatch(setDoing('VIDEO'));

	axios.get('/videos')
	.then(function (response) {
		dispatch(loadVideos('VIDEO', response.data));
		dispatch(setDone('VIDEO'));
	})
};

export const doFetchMyVideos = () => dispatch => {
	dispatch(setDoing('MY_VIDEO'));

	axios.get('/my-videos')
	.then(function (response) {
		dispatch(loadVideos('MY_VIDEO', response.data));
		dispatch(setDone('MY_VIDEO'));
	})
};

export const doFetchOneMyVideo = (videoId) => dispatch => {
	dispatch(setDoing('MY_VIDEO'));
	axios.get(`/my-videos/${videoId}`)
	.then(response => {
		dispatch(initialize('video', response.data, fields));
		dispatch(setDone('MY_VIDEO'));
	})
};

export const doSaveMyVideo = (video) => dispatch => {
	dispatch(setDoing('MY_VIDEO'));
	axios.post(`/my-videos`, video)
	.then(response => {
		dispatch(goBack());
	});
};
