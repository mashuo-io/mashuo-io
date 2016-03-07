'use strict';

let config = require('../../config/config');
let qiniu = require('qiniu');

qiniu.conf.ACCESS_KEY = config.qiniu.accessKey;
qiniu.conf.SECRET_KEY = config.qiniu.secretKey;

module.exports = {
	getUptoken: function *() {
		let element = this.params.key
			? `${config.qiniu.bucket}:${this.params.key}`
			: config.qiniu.bucket;
		let putPolicy = new qiniu.rs.PutPolicy(element);
		this.body = {uptoken: putPolicy.token()};
	}
};