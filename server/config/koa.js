import responseTime from "koa-response-time";
import  compress from "koa-compress";
import  bodyParser from "koa-bodyparser";
import cors from 'kcors';
import config from "../config/config";

export const setUpKoa = (app) => {
	app.keys = config.app.keys;

	app.use(function *(next) {
		try {
			yield next;
		} catch (err) {
			app.emit('error', Object.assign(err, {requestBody:this.request.body, request: this.request}));
			this.status = err.status || 500;
			this.body = {error: err.message};
		}
	})
	.use(cors())
	.use(bodyParser())
	.use(compress())
	.use(responseTime())
	.on('error', err => {
		console.log(
`
url: ${err.request ? err.request.method + ' ' + err.request.url : 'N/A'}
headers: ${err.request ? JSON.stringify(err.request.headers, null, ' ') : 'N/A'}
data: ${err.requestBody ? JSON.stringify(err.requestBody) : 'N/A'}
status: ${err.status}
trace: ${err.stack} `);
	})
	;
};