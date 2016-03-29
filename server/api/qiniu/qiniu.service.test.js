"use strict";
let expect = require('chai').expect;
let request = require('supertest-as-promised')(require('../../index').listen());
let tool = require('../shared/tool.test');

describe('qiniu', () => {
	it('should get qiniu token with key', function *() {
		yield request.get('/api/qiniu-token/abc.jpg')
		.expect(200)
		.expect(res=>expect(res.body).to.have.property('uptoken'));
	});

	it('should NOT get qiniu token without key', function *() {
		yield request.get('/api/qiniu-token')
		.expect(404)
	});
});