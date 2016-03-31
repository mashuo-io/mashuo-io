import tools from '../shared/tool.test';
import {expect} from 'chai';
let request = require('supertest-as-promised')(require('../../index').listen());

describe.only('profile', () => {
	let accountId, token, courseId, videoId1, videoId2;

	beforeEach(function *() {
		yield tools.cleanDb();
		courseId = yield tools.saveCourse({name: 'test', videos: [
			{name: '1', src: 'http:/1', duration: 100},
			{name: '2', src: 'http:/2', duration: 150}
		]});

		let res = yield request.get(`/api/courses/${courseId}`);
		videoId1 = res.body.videos[0]._id;
		videoId2 = res.body.videos[1]._id;

		let result = yield tools.mockGithubLogin('ron-liu');
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
		yield request.post(`/api/my-profile/watch-history/${courseId}/video/${videoId1}`)
		.set({Authorization: `Bearer ${token}`})
		.send({status: 'watched'})
		.expect(200);

		let history = {
			progress: 40,
			videos: [
				{_id: videoId1, status: 'watched', durationWatched: 0}
			]
		};

		yield request.get(`/api/my-profile/watch-histories`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body[courseId]).to.eql(history));

		yield request.get(`/api/my-profile/watch-history/${courseId}`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body).to.eql(history));
	});


	it('add a watch pregress should be ok', function * () {
		yield request.post(`/api/my-profile/watch-history/${courseId}/video/${videoId1}`)
		.set({Authorization: `Bearer ${token}`})
		.send({status: 'watching', durationWatched: 50})
		.expect(200);

		let history = {
			progress: 20,
			videos: [
				{_id: videoId1, status:'watching', durationWatched: 50}
			]
		};

		yield request.get(`/api/my-profile/watch-histories`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body[courseId]).to.eql(history));

		yield request.get(`/api/my-profile/watch-history/${courseId}`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body).to.eql(history));
	});
});