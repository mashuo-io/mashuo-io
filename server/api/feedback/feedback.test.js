let request = require('supertest-as-promised')(require('../../index').listen());
import {cleanDb, mockGithubLogin, saveCourse} from '../shared/tool.test';
import {expect} from 'chai';

describe('feedbacks', function() {
	let courseId;
	let accountId, token;
	let accountId1, token1;

	beforeEach(function *() {
		yield cleanDb();
		courseId = yield saveCourse({name: 'test', videos: [{name: '1', src: 'http:/fdsa', duration: 100}]});
		let result = yield mockGithubLogin('ron-liu');
		accountId = result.accountId;
		token = result.token;

		result = yield mockGithubLogin('zhui');
		accountId1 = result.accountId;
		token1 = result.token;
	});

	it('like should work', function *() {
		yield request
		.post(`/api/course/${courseId}/feedbacks/like`)
		.set({Authorization: `Bearer ${token}`})
		.send()
		.expect(200);

		yield request
		.get(`/api/course/${courseId}/feedbacks`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body.likes).to.have.length(1))
	});

	it('comment should work', function *() {
		yield request
		.post(`/api/course/${courseId}/feedbacks/comment`)
		.set({Authorization: `Bearer ${token}`})
		.send({comment:'hi'})
		.expect(200);

		yield request
		.get(`/api/course/${courseId}/feedbacks`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body.comments).to.have.length(1))
		.expect(res=>expect(res.body.comments[0].comment).to.eql('hi'))
	});

	it('comment is required when post comment', function *() {
		yield request
		.post(`/api/course/${courseId}/feedbacks/comment`)
		.set({Authorization: `Bearer ${token}`})
		.expect(500);
	});

	it('like only once per user', function *() {
		yield request
		.post(`/api/course/${courseId}/feedbacks/like`)
		.set({Authorization: `Bearer ${token}`})
		.send()
		.expect(200);

		yield request
		.post(`/api/course/${courseId}/feedbacks/like`)
		.set({Authorization: `Bearer ${token}`})
		.send()
		.expect(200);

		yield request
		.get(`/api/course/${courseId}/feedbacks`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body.likes).to.have.length(1));
	});

	it('delete like should work', function *() {
		let feedbackId;

		yield request
		.post(`/api/course/${courseId}/feedbacks/like`)
		.set({Authorization: `Bearer ${token}`})
		.send()
		.expect(200)
		.expect(res=>feedbackId = res.body._id);

		yield request
		.del(`/api/course/${courseId}/feedbacks/${feedbackId}`)
		.set({Authorization: `Bearer ${token}`})
		.send()
		.expect(200)
		.expect(res=>expect(res.body.done).to.be.true);

		yield request
		.get(`/api/course/${courseId}/feedbacks`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body.likes).to.have.length(0));
	});

	it('should not delete other\'s like', function *() {
		let feedbackId;

		yield request
		.post(`/api/course/${courseId}/feedbacks/like`)
		.set({Authorization: `Bearer ${token}`})
		.send()
		.expect(200)
		.expect(res=>feedbackId = res.body._id);

		yield request
		.del(`/api/course/${courseId}/feedbacks/${feedbackId}`)
		.set({Authorization: `Bearer ${token1}`})
		.send()
		.expect(403);

		yield request
		.get(`/api/course/${courseId}/feedbacks`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body.likes).to.have.length(1));
	});

	it('delete nothing should return 500', function *() {
		let feedbackId;

		yield request
		.del(`/api/course/${courseId}/feedbacks/${courseId}`)
		.set({Authorization: `Bearer ${token}`})
		.send()
		.expect(500);
	});

	it ('feedbacks-statistics', function *() {

		yield request
		.post(`/api/course/${courseId}/feedbacks/like`)
		.set({Authorization: `Bearer ${token}`})
		.send()
		.expect(200);

		yield request
		.post(`/api/course/${courseId}/feedbacks/comment`)
		.set({Authorization: `Bearer ${token}`})
		.send({comment: 'good'})
		.expect(200);

		yield request
		.post(`/api/course/${courseId}/feedbacks/comment`)
		.set({Authorization: `Bearer ${token}`})
		.send({comment: 'better'})
		.expect(200);

		yield request
		.get(`/api/course/${courseId}/feedbacks-statistics`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body).to.eql({likes:1, comments:2}));
	});

	it('validation check', function *() {
		yield request
		.get(`/api/xxx/111/feedbacks`)
		.set({Authorization: `Bearer ${token}`})
		.expect(500);

		yield request
		.get(`/api/xxx/111/feedbacks-statistics`)
		.set({Authorization: `Bearer ${token}`})
		.expect(500);
	});

	it('like comment should work', function *() {
		let feedbackId;

		yield request
		.post(`/api/course/${courseId}/feedbacks/comment`)
		.set({Authorization: `Bearer ${token}`})
		.send({comment: 'good'})
		.expect(200)
		.expect(res=>feedbackId = res.body._id);

		yield request
		.post(`/api/comment/${feedbackId}/feedbacks/like`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200);

		yield request.get(`/api/course/${courseId}/feedbacks`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body.comments).to.have.length(1))
		.expect(res=>expect(res.body.comments[0].likes).to.eql(1));
	});

	it('unlike for comment should work', function *() {
		let feedbackId, feedbackLikeId;

		yield request
		.post(`/api/course/${courseId}/feedbacks/comment`)
		.set({Authorization: `Bearer ${token}`})
		.send({comment: 'good'})
		.expect(200)
		.expect(res=>feedbackId = res.body._id);

		yield request
		.post(`/api/comment/${feedbackId}/feedbacks/like`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>feedbackLikeId = res.body._id);

		yield request
		.del(`/api/comment/${feedbackId}/feedbacks/` + feedbackLikeId)
		.set({Authorization: `Bearer ${token}`})
		.expect(200);

		yield request.get(`/api/course/${courseId}/feedbacks`)
		.set({Authorization: `Bearer ${token}`})
		.expect(200)
		.expect(res=>expect(res.body.comments).to.have.length(1))
		.expect(res=>expect(res.body.comments[0].likes).to.eql(0));
	});

});