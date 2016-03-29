"use strict";

var path = require("path");
var _ = require("lodash");

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var base = {
	app: {
		root: path.normalize(path.join(__dirname, "/..")),
		env: env
	},
	mongo: {
		debug: true
	},
	defaultTokenTtl: 60*60*24*3, // 3 days by default
	qiniu: {
		accessKey: '4E1QPOwTOwbW2p6AGeIve3jw4I6Udy3CjjlHq91b',
		secretKey: 'mQyFwg53EvU1hsXBbU8ml0hFWVIdCpO7yVUul1Pj',
		bucket: 'test',
		domainName: '7xrmd3.com1.z0.glb.clouddn.com'
	},
	likeableRefTypes: ['course', 'comment', 'video']
};

var specific = {
	development: {
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