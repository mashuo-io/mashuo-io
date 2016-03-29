import app from '../index';
let request = require('supertest-as-promised')(app.listen());
import tool from './shared/tool.test';

describe('route', ()=>{
	it('root should work', function *() {
		yield request.get('/api/')
		.expect(200);
	})
});