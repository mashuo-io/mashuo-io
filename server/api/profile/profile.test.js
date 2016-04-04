import {saveCourse, cleanDb, mockGithubLogin, sleep} from '../shared/tool.test';
import {expect} from 'chai';
let request = require('supertest-as-promised')(require('../../index').listen());
import {o} from '../shared/util';

describe('profile', () => {
	let accountId, token, courseId, videoId1, videoId2;

	beforeEach(function *() {
		yield cleanDb();
		courseId = yield saveCourse({name: 'test', videos: [
			{name: '1', src: 'http:/1', duration: 100},
			{name: '2', src: 'http:/2', duration: 150}
		]});

		let res = yield request.get(`/api/courses/${courseId}`);
		videoId1 = res.body.videos[0]._id;
		videoId2 = res.body.videos[1]._id;

		let result = yield mockGithubLogin('ron-liu');
		accountId = result.accountId;
		token = result.token;
	});

	it('get profile before creation should be ok', function * () {
		yield request.get(`/api/my-profile/watch-histories`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body).to.eql([]));

		yield request.get(`/api/my-profile/watch-history/${courseId}`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body).to.eql({status: 'new', durationWatched: 0, videos: {}}));
	});

	it('add a watched history should be ok', function * () {

		yield request.post(`/api/events`)
		.set({Authorization: `Bearer ${token}`})
		.send({
			type: 'video-ended',
			data: {courseId, videoId: videoId1}
		})
		.expect(200);

		yield sleep(1);

		let history = {
			course: courseId,
			durationWatched: 100,
			videos: o(videoId1, {status: 'watched', durationWatched: 100})
		};

		yield request.get(`/api/my-profile/watch-histories`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body).to.eql([history]));

		yield request.get(`/api/my-profile/watch-history/${courseId}`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body).to.eql(history));
	});


	it('add a watch pregress should be ok', function * () {
		yield request.post(`/api/events`)
		.set({Authorization: `Bearer ${token}`})
		.send({
			type: 'video-timeupdate',
			data: {currentTime: 50, courseId, videoId: videoId1}
		})
		.expect(200);

		yield sleep(1);

		let history = {
			course: courseId,
			durationWatched: 50,
			videos: o(videoId1, {status:'watching', durationWatched: 50})
		};

		yield request.get(`/api/my-profile/watch-histories`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body).to.eql([history]));

		yield request.get(`/api/my-profile/watch-history/${courseId}`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body).to.eql(history));
	});

	it('times watched should be ok', function * () {
		yield request.post(`/api/events`)
		.set({Authorization: `Bearer ${token}`})
		.send({
			type: 'video-times',
			data: {courseId, videoId: videoId1}
		})
		.expect(200);

		yield sleep(1);

		yield request.get(`/api/courses/${courseId}`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>{
			let videos = res.body.videos;
			let video = videos.find(x=> x._id == videoId1);
			expect(video.timesWatched).to.eql(1)
		});
	});

	it('before toggle favorite should be ok', function *() {
		let favorite = {
			course: courseId,
			videos: {}
		};

		yield request.get(`/api/my-profile/favorites/${courseId}`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>{
			expect(res.body).to.eql(favorite);
		});
	});

	it('toggle favorite should be ok', function *() {
		yield request.post(`/api/events`)
		.set({Authorization: `Bearer ${token}`})
		.send({
			type: 'video-togglefavorite',
			data: {courseId, videoId: videoId1}
		})
		.expect(200);

		yield sleep(1);

		let favorite = {
			course: courseId,
			videos: o(videoId1, true)
		};

		yield request.get(`/api/my-profile/favorites/${courseId}`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>{
			expect(res.body).to.eql(favorite);
		});
	});

	it('toggle favorite twice should be ok', function *() {
		yield request.post(`/api/events`)
		.set({Authorization: `Bearer ${token}`})
		.send({
			type: 'video-togglefavorite',
			data: {courseId, videoId: videoId1}
		})
		.expect(200);

		yield request.post(`/api/events`)
		.set({Authorization: `Bearer ${token}`})
		.send({
			type: 'video-togglefavorite',
			data: {courseId, videoId: videoId1}
		})
		.expect(200);

		yield sleep(1);

		let favorite = {
			course: courseId,
			videos: o(videoId1, false)
		};

		yield request.get(`/api/my-profile/favorites/${courseId}`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>{
			expect(res.body).to.eql(favorite);
		});
	});

});