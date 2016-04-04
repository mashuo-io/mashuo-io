import {expect} from 'chai';
import {is, fromJS} from 'immutable';

export const testReducer = (reducer, cases) => {
	cases.forEach(x=>{
		let {before, action, after} = x;
		expect(reducer(before, action)).to.eql(after);
	});
};

export const testReducerUsingImmutableJs = (reducer, cases) => {
	cases.forEach((x, index)=>{
		let {before, action, after} = x;
		let actual = reducer(fromJS(before), action);
		let passed = is(actual, fromJS(after));
		if (!passed) throw new Error(`#${index + 1}: failed, 
${JSON.stringify(x, null, '  ')}		
actual: ${JSON.stringify(actual, null, '  ')}`);
	});
};