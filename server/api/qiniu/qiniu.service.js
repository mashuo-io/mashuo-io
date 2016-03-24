'use strict';

let config = require('../../config/config');
let qiniu = require('qiniu');

qiniu.conf.ACCESS_KEY = config.qiniu.accessKey;
qiniu.conf.SECRET_KEY = config.qiniu.secretKey;

module.exports = {
	getUptoken: function *() {
		let key = this.params.key;
		let element = `${config.qiniu.bucket}:${key}`;
		let putPolicy = new qiniu.rs.PutPolicy(element);
		putPolicy.returnBody = `{
			"src": "http://${config.qiniu.domainName}/${key}",
			"duration": $(avinfo.video.duration)
		}`;
		this.body = {uptoken: putPolicy.token()};
	}
};