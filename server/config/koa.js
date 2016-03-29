"use strict";

const responseTime = require("koa-response-time");
const logger = require("koa-logger");
const compress = require("koa-compress");
const bodyParser = require("koa-bodyparser");
const cors = require('kcors');


module.exports = function(app, config) {
	app.keys = config.app.keys;

	// if (config.app.env !== "test") {
	// 	app.use(logger());
	// }
	//

	app.use(function *(next) {
		try {
			yield next;
		} catch (err) {
			console.log('err.....', err, err.status, this.request);
			console.error(
				`url: ${this.request.method} ${this.request.url}
				headers: ${JSON.stringify(this.request.headers, null, ' ')}
				data: ${this.request.body ? JSON.stringify(this.request.body) : ''}
				status: ${err.status}
				trace: ${err.stack} 
				`);
			// app.emit('error', {err, requestBody: this.request.body, request: this.request});
			this.status = err.status || 500;
			this.body = {error: err.message};
		}
	})
	.use(cors())
	.use(bodyParser())
	.use(compress())
	.use(responseTime());
};