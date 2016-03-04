let fetch = require('isomorphic-fetch');

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
	return (disptch) => {
		disptch(startFetching());

		fetch('http://localhost:3000/api/videos')
		.then(x=> x.json())
		.then(x=>disptch(finishFetching(x)));

	}
}