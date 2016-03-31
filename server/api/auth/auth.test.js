import {mockGithubLogin, cleanDb} from '../shared/tool.test';
import {expect} from 'chai';
let request = require('supertest-as-promised')(require('../../index').listen());

describe('auth', () => {
	let token;

	beforeEach(function *() {
		yield cleanDb();
		let result = yield mockGithubLogin('ron-liu');
		token = result.token;
	});

	it ('without clientId should be ok', function* () {
		yield request.get('/api/my-courses')
		.set({Authorization: `Bearer ${token}`})
		.expect(200);
	});

	it ('with clientId should be ok', function* () {
		yield request.get('/api/my-courses')
		.set({Authorization: `Bearer ${token} fdasfdsafdsa`})
		.expect(200);
	});

});