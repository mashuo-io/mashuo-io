"use strict";
let _ = require('lodash');
let v = require('validate-obj');
let moment = require('moment');
let config = require('../../config/config');
let ObjectId = require('mongoose').Types.ObjectId;
let co = require('co');

v.register('isPattern',
	function(value, params) {
		if(!_.isArray(params) || params.length !== 1 || !(_.first(params) instanceof RegExp)) {
			throw 'isPattern MUST have one and only one RegExp param';
		}
	}
);

v.register('isObjectId', v.build(ObjectId.isValid, name => `${name} is not an Object Id`) );

v.register('isDateString', v.build( v=>moment(v).isValid(), name => `${name} is not an date string`));

v.register('isArray', function(v) {
	if (v && !_.isArray(v)) throw 'not a array';
});

v.register('isNumberString', v => {
	if(v) {
		try {
			parseFloat(v);
		}
		catch (err) {
			throw 'not a number string';
		}
	}
});

export function checkRouteError(context, sch, getWhatToValidate, extraValidations) {
	let target = _.isObject(getWhatToValidate) ? getWhatToValidate : getWhatToValidate(context);
	let errors = v.hasErrors(target, sch);

	extraValidations = extraValidations || [];
	extraValidations = _.isArray(extraValidations) ? extraValidations : [extraValidations];
	let extraErrors = _.reduce(extraValidations, function(total, validator){
		let err = validator(target);
		if (!_.isEmpty(err)) return total.concat(_.isArray(err) ? err : [err]);
	}, []);

	if (!_.isEmpty(extraErrors)) errors = (errors || []).concat(extraErrors);

	if (errors) {
		context.throw(500, errors.join('\n'));
	}
}
