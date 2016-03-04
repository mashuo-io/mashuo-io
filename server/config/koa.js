"use strict";

const responseTime = require("koa-response-time");
const logger = require("koa-logger");
const compress = require("koa-compress");
const errorHandler = require("koa-error");
const bodyParser = require("koa-bodyparser");


module.exports = function(app, config) {
	app.keys = config.app.keys;

	if (config.app.env !== "test") {
		app.use(logger());
	}
	//app.use(errorHandler());
	app.use(bodyParser());
	//app.use(compress());
	//app.use(responseTime());
};