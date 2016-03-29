import responseTime from "koa-response-time";
import  compress from "koa-compress";
import  bodyParser from "koa-bodyparser";
import cors from 'kcors';

module.exports = function(app, config) {
	app.keys = config.app.keys;

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