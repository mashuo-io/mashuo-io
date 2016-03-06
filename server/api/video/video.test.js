"use strict";
let expect = require('chai').expect;
let request = require('supertest-as-promised')(require('../../index').listen());
let tool = require('../shared/tool.test');

describe('video', () => {
	let accountId, token;
	let accountId1, token1;

	beforeEach(function *() {
		yield tool.cleanDb();

		let result = yield tool.mochaGithubLogin('ron-liu');
		accountId = result.accountId;
		token = result.token;

		result = yield tool.mochaGithubLogin('zhui');
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
		.set('Authorization', `Bearer ${token1}`)
		.expect(200)
		.expect(res=>expect(res.body).to.have.length(0));
	});


});