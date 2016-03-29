import 'babel-polyfill';
import koa from "koa";
let router = require('koa-router')();
const mongoose = require("mongoose");
import config from "./config/config";

console.log('connect to', config.mongo.url);
mongoose.connect(config.mongo.url, {server: {socketOptions:  {keepAlive: 1}}});
mongoose.set('debug', config.mongo.debug);
mongoose.connection.on('error', function(err){ console.error('MongoDB error: %s', err)});

router.use('/api', require('./api/route').routes());

const app = module.exports = koa();
require("./config/koa")(app, config);
app.use(router.routes());

if (!module.parent) {
	app.listen(config.app.port);
	console.log("Server started, listening on port: " + config.app.port);
}
console.log("Environment: " + config.app.env);