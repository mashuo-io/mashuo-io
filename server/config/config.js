"use strict";

var path = require("path");
var _ = require("lodash");

var env = process.env.NODE_ENV = process.env.NODE_ENV || "dev";

var base = {
	app: {
		root: path.normalize(path.join(__dirname, "/..")),
		env: env
	},
	mongo: {
		debug: true
	}
};

var specific = {
	dev: {
		app: {
			port: 3000,
			name: "dev"
		},
		mongo: {
			url: "mongodb://localhost/mashuo"
		}
	},
	test: {
		app: {
			port: 3001,
			name: "test"
		},
		mongo: {
			url: "mongodb://localhost/mashuoTest"
		}
	},
	prod: {
		app: {
			port: process.env.PORT || 3000,
			name: "prod"
		},
		mongo: {
			url: "mongodb://localhost/mashuoProd"
		}
	}
};

module.exports = _.merge(base, specific[env]);