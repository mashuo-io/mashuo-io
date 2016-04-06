import {expect} from 'chai';
let request = require('supertest-as-promised')(require('../../index').listen());
import {mockGithubLogin, cleanDb} from '../shared/tool.test';

describe('video', () => {
	let accountId, token;
	let accountId1, token1;

	beforeEach(function *() {
		yield cleanDb();

		let result = yield mockGithubLogin('ron-liu');
		accountId = result.accountId;
		token = result.token;

		result = yield mockGithubLogin('zhui');
		accountId1 = result.accountId;
		token1 = result.token;

	});

	it('my video should not work without auth', function *() {
		yield request.get('/api/my-courses')
		.expect(401);
	});

	it('save video should work', function *() {
		let courseId;
		yield request.post('/api/my-courses')
		.set('Authorization', `Bearer ${token}`)
		.send({
			name: 'c#',
			describe: 'c# course',
			videos: [
				{name: 'string', src: 'http://abc', duration: 150}
			]
		})
		.expect(200)
		.expect(res=>courseId = res.body._id);

		yield request.get('/api/my-courses')
		.set('Authorization', `Bearer ${token}`)
		.expect(200)
		.expect(res=>expect(res.body).to.have.length(1));

		yield request.get('/api/courses')
		.expect(200)
		.expect(res=>expect(res.body).to.have.length(1));

		yield request.get(`/api/courses/${courseId}`)
		.expect(200)
		.expect(res=>expect(res.body.name).to.eql('c#'))
		.expect(res=>expect(res.body.videos[0].src).to.eql('http://abc'))
	});

	it('others should not see my video', function *() {

		let videoId;

		yield request.post('/api/my-courses')
		.set('Authorization', `Bearer ${token}`)
		.send({
			name: 'c#',
			describe: 'c# course',
			videos: [
				{name: 'string', src: 'http://abc', duration: 150}
			]
		})
		.expect(200)
		.expect(res=>videoId = res.body._id);

		yield request.get('/api/my-courses')
		.set('Authorization', `Bearer ${token1}`)
		.expect(200)
		.expect(res=>expect(res.body).to.have.length(0));

		yield request.get(`/api/my-courses/${videoId}`)
		.set('Authorization', `Bearer ${token1}`)
		.expect(403)

	});

	it('get my video by id should work', function *() {
		let videoId;

		yield request.post('/api/my-courses')
		.set('Authorization', `Bearer ${token}`)
		.send({
			name: 'c#',
			describe: 'c# course',
			videos: [
				{name: 'string', src: 'http://abc', duration: 150}
			]
		})
		.expect(200)
		.expect(res=>videoId = res.body._id);

		yield request.get(`/api/my-courses/${videoId}`)
		.set('Authorization', `Bearer ${token}`)
		.expect(200)
		.expect(res=>expect(res.body.name).to.eql('c#'));
	});

	it('update should work', function *() {
		let videoId;

		yield request.post('/api/my-courses')
		.set('Authorization', `Bearer ${token}`)
		.send({
			name: 'c#',
			describe: 'c# course',
			videos: [
				{name: 'string', src: 'http://abc', duration: 150}
			]
		})
		.expect(200)
		.expect(res=>videoId = res.body._id);

		yield request.post('/api/my-courses')
		.set('Authorization', `Bearer ${token}`)
		.send({
			_id: videoId,
			name: 'c#',
			describe: 'c# course',
			videos: [
				{name: 'string', src: 'http://abc', duration: 150}
			]
		})
		.expect(200)
		.expect(res=>videoId = res.body._id);

		yield request.get(`/api/my-courses`)
		.set('Authorization', `Bearer ${token}`)
		.expect(200)
		.expect(res=>expect(res.body).to.have.length(1));

	});
});