import tools from '../shared/tool.test';
import {expect} from 'chai';
let request = require('supertest-as-promised')(require('../../index').listen());
import {EventModel} from './event.model'

describe('event', () => {
	let accountId, token;
	beforeEach(function *() {
		yield tools.cleanDb();
		let result = yield tools.mockGithubLogin('ron-liu');
		accountId = result.accountId;
		token = result.token;
	});
	
	it ('with user should work', function *() {
		let data ={videoId: '1', courseId: '2'};

		yield request.post('/api/events')
		.set({Authorization: `Bearer ${token} 123`})
		.send({type: 'video-ended', data})
		.expect(200);

		let event = yield EventModel.findOne().lean();
		expect(event.type).to.eql('video-ended');
		expect(event.clientId).to.eql('123');
		expect(event.user).to.eql(accountId);
		expect(event.data).to.eql(data);
	});

	it ('without user should work', function *() {
		let data ={videoId: '1', courseId: '2'};

		yield request.post('/api/events')
		.set({Authorization: `Bearer null 123`})
		.send({type: 'video-ended', data})
		.expect(200);

		let event = yield EventModel.findOne().lean();
		expect(event.type).to.eql('video-ended');
		expect(event.clientId).to.eql('123');
		expect(event.user).to.undefined;
		expect(event.data).to.eql(data);
	});

});

