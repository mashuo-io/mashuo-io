import 'babel-polyfill';
import koa from "koa";
let router = require('koa-router')();
import mongoose from "mongoose";
import config from "./config/config";
import {setUpKoa} from './config/koa';

setUpMongo();
const app = module.exports = koa();
router.use('/api', require('./api/route').routes());
setUpKoa(app);
app.use(router.routes());

if (!module.parent) {
	app.listen(config.app.port);
	console.log("Server started, listening on port: " + config.app.port);
}
console.log("Environment: " + config.app.env);

function setUpMongo() {
	console.log('connect to', config.mongo.url);
	mongoose.connect(config.mongo.url, {server: {socketOptions:  {keepAlive: 1}}});
	mongoose.set('debug', config.mongo.debug);
	mongoose.connection.on('error', function(err){ console.error('MongoDB error: %s', err)});
}