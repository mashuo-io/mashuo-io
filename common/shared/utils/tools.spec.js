import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

export const testReducer = (reducer, cases) => {
	cases.forEach((x, index)=>{
		let {before, action, after} = x;
		if (before != null) deepFreeze(before);
		let actual = reducer(before, action);
		try {
			expect(actual).to.eql(after);
		}
		catch (err) {
			throw new Error(`#${index + 1}: failed, 
${JSON.stringify(x, null, '  ')}		
actual: ${JSON.stringify(actual, null, '  ')}`);
		}
	});
};
