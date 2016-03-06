"use strict";

const responseTime = require("koa-response-time");
const logger = require("koa-logger");
const compress = require("koa-compress");
const errorHandler = require("koa-error");
const bodyParser = require("koa-bodyparser");
const cors = require('kcors');


module.exports = function(app, config) {
	app.keys = config.app.keys;

	if (config.app.env !== "test") {
		app.use(logger());
	}
	app.use(errorHandler())
	.use(cors())
	.use(bodyParser())
	.use(compress())
	.use(responseTime());
};