import generateReducer from './reducer-generator.js';
import {expect} from 'chai';

describe('reducer-generator', ()=>{
	it ('basic should work', ()=>{

		let reducer = generateReducer('test', {
			'getData': (state, action) => Object.assign({}, state, {data: action.data})
		}, {doing:1});
		expect(reducer({data:1}, {data: 3, type:'test.getData'})).to.eql({data: 3});
	});

	it ('initial state should work', ()=>{
		let reducer = generateReducer('test', {}, {doing:1});
		expect(reducer(undefined, {})).to.eql({doing: 1});
	});

});

