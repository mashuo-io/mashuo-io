//let fetch = require('isomorphic-fetch');
let axios = require('axios');

export function setDoing() {
	return {
		type: 'VIDEO.SET_DOING'
	}
}

export function setDone() {
	return {
		type: 'VIDEO.SET_DONE'
	}
}

export function loadPublicVideos(videos) {
	return {
		type: 'VIDEO.LOAD_VIDEOS',
		videos
	}
}

export function doFetchPublicVideos() {
	return (dispatch) => {
		dispatch(setDoing());

		axios.get('http://127.0.0.1:3000/api/videos')
		.then(function (response) {
			dispatch(loadPublicVideos(response.data));
			dispatch(setDone());
		})
		.catch(x=>{})
	}
}

export function doFetchMyVideos() {
	return (dispatch) => {
		dispatch(setDoing());

		axios.get('http://127.0.0.1:3000/api/my-videos')
		.then(function (response) {
			dispatch(loadPublicVideos(response.data));
			dispatch(setDone());
		})
		.catch(x=>{})
	}
}