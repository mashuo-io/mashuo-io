//let fetch = require('isomorphic-fetch');
let axios = require('axios');

export function startFetching() {
	return {
		type: 'VIDEO.START_FETCHING'
	}
}

export function finishFetching(videos) {
	return {
		type: 'VIDEO.FINISH_FETCHING',
		videos
	}
}

export function doFetch() {
	return (dispatch) => {
		dispatch(startFetching());

		//fetch('http://localhost:3000/api/videos')
		//.then(x=> x.json())
		//.then(x=>{
		//	console.log(x);
		//	dispatch(finishFetching(x))
		//});

		axios.get('http://localhost:3000/api/videos')
		.then(function (response) {
			dispatch(finishFetching(response.data));
		})
		.catch(x=>{})
	}
}