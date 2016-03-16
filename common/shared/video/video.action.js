import {initialize} from 'redux-form';
import axios from '../utils/server-request.service';
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

export const loadVideo = (video) => ({
	type: `VIDEO.LOAD_VIDEO`,
	video
});

export const doFetchPublicVideos = () => dispatch => {
	dispatch(setDoing('VIDEO_LIST'));

	axios.get('/videos')
	.then(function (response) {
		dispatch(loadVideos('VIDEO_LIST', response.data));
		dispatch(setDone('VIDEO_LIST'));
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

export const doFetchOneVideo = (videoId) => dispatch => {
	dispatch(setDoing('VIDEO'));
	axios.get(`/videos/${videoId}`)
	.then(response=> {
		dispatch(loadVideo(response.data));
		dispatch(setDone('VIDEO'));
	});
};

export const doSaveMyVideo = (video) => dispatch => {
	dispatch(setDoing('MY_VIDEO'));
	axios.post(`/my-videos`, video)
	.then(response => {
		dispatch(goBack());
	});
};
