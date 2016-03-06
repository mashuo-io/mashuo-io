//let fetch = require('isomorphic-fetch');
let axios = require('axios');

export function setDoing(prefix) {
	return {
		type: `${prefix}.SET_DOING`
	}
}

export function setDone() {
	return {
		type: `${prefix}.SET_DONE`
	}
}

export function loadVideos(prefix, videos) {
	return {
		type: `${prefix}.LOAD_VIDEOS`,
		videos
	}
}

export function doFetchPublicVideos() {
	return (dispatch) => {
		dispatch(setDoing('VIDEO'));

		axios.get('http://127.0.0.1:3000/api/videos')
		.then(function (response) {
			dispatch(loadVideos('VIDEO', response.data));
			dispatch(setDone('VIDEO'));
		})
		.catch(x=>{})
	}
}

export function doFetchMyVideos() {
	return (dispatch) => {
		dispatch(setDoing('MY_VIDEO'));

		axios.get('http://127.0.0.1:3000/api/my-videos')
		.then(function (response) {
			dispatch(loadVideos('MY_VIDEO', response.data));
			dispatch(setDone('MY_VIDEO'));
		})
		.catch(x=>{})
	}
}