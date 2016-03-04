"use strict";
let expect = require('chai').expect;
let request = require('supertest-as-promised')(require('../../index').listen());
let tool = require('../shared/tool.test');

describe('video', () => {

	beforeEach(function *() {
		yield tool.cleanDb();
	});

	it('save video should work', function *() {

		yield request.post('/api/videos')
		.send({
			name: 'c#',
			describe: 'c# course',
			episodes: [
				{name: 'string', url: 'http://abc', duration: 150}
			]
		})
		.expect(200);

		yield request.get('/api/videos')
		.expect(200)
		.expect(res=>expect(res.body).to.have.length(1));

	});
});