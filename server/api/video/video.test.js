"use strict";
let expect = require('chai').expect;
let request = require('supertest-as-promised')(require('../../index').listen());
let tool = require('../shared/tool.test');

describe('video', () => {
	let accountId, token;
	let accountId1, token1;

	beforeEach(function *() {
		yield tool.cleanDb();

		let result = yield tool.mockGithubLogin('ron-liu');
		accountId = result.accountId;
		token = result.token;

		result = yield tool.mockGithubLogin('zhui');
		accountId1 = result.accountId;
		token1 = result.token;

	});

	it('my video should not work without auth', function *() {
		yield request.get('/api/my-videos')
		.expect(401);
	});

	it('save video should work', function *() {

		yield request.post('/api/my-videos')
		.set('Authorization', `Bearer ${token}`)
		.send({
			name: 'c#',
			describe: 'c# course',
			episodes: [
				{name: 'string', url: 'http://abc', duration: 150}
			]
		})
		.expect(200);

		yield request.get('/api/my-videos')
		.set('Authorization', `Bearer ${token}`)
		.expect(200)
		.expect(res=>expect(res.body).to.have.length(1));

		yield request.get('/api/videos')
		.expect(200)
		.expect(res=>expect(res.body).to.have.length(1));
	});

	it('others should not see my video', function *() {

		let videoId;

		yield request.post('/api/my-videos')
		.set('Authorization', `Bearer ${token}`)
		.send({
			name: 'c#',
			describe: 'c# course',
			episodes: [
				{name: 'string', url: 'http://abc', duration: 150}
			]
		})
		.expect(200)
		.expect(res=>videoId = res.body._id);

		yield request.get('/api/my-videos')
		.set('Authorization', `Bearer ${token1}`)
		.expect(200)
		.expect(res=>expect(res.body).to.have.length(0));

		yield request.get(`/api/my-videos/${videoId}`)
		.set('Authorization', `Bearer ${token1}`)
		.expect(403)

	});

	it('get my video by id should work', function *() {
		let videoId;

		yield request.post('/api/my-videos')
		.set('Authorization', `Bearer ${token}`)
		.send({
			name: 'c#',
			describe: 'c# course',
			episodes: [
				{name: 'string', url: 'http://abc', duration: 150}
			]
		})
		.expect(200)
		.expect(res=>videoId = res.body._id);

		yield request.get(`/api/my-videos/${videoId}`)
		.set('Authorization', `Bearer ${token}`)
		.expect(200)
		.expect(res=>expect(res.body.name).to.eql('c#'));
	});

	it('update should work', function *() {
		let videoId;

		yield request.post('/api/my-videos')
		.set('Authorization', `Bearer ${token}`)
		.send({
			name: 'c#',
			describe: 'c# course',
			episodes: [
				{name: 'string', url: 'http://abc', duration: 150}
			]
		})
		.expect(200)
		.expect(res=>videoId = res.body._id);

		yield request.post('/api/my-videos')
		.set('Authorization', `Bearer ${token}`)
		.send({
			_id: videoId,
			name: 'c#',
			describe: 'c# course',
			episodes: [
				{name: 'string', url: 'http://abc', duration: 150}
			]
		})
		.expect(200)
		.expect(res=>videoId = res.body._id);

		yield request.get(`/api/my-videos`)
		.set('Authorization', `Bearer ${token}`)
		.expect(200)
		.expect(res=>expect(res.body).to.have.length(1));

	});


});