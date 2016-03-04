'use strict';

let app= require('../index');
let request = require('supertest-as-promised')(app.listen());
let tool = require('./shared/tool.test');

describe('route', ()=>{
	it('root should work', function *() {
		yield request.get('/api/')
		.expect(200);
	})
});