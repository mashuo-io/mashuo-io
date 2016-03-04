"use strict";

let mongoose = require('mongoose');
let _ = require('lodash');

var mocha = require('mocha');
var coMocha = require('co-mocha');
coMocha(mocha);

module.exports = {

	cleanDb: () => {
		let promises = _.map(mongoose.models, function (m) {
			return new Promise(function (resolve) {
				m.collection.remove({}, resolve);
			});
		});

		return Promise.all(promises);
	}
};