'use strict';
let VideoModel = require('./model').videoModel;

module.exports = {
	saveVideos: function * (){
		let v = yield new VideoModel(this.request.body).save();
		this.body = {_id: v._id};
	},

	getVideos: function *() {
		this.body = yield VideoModel.find({}).lean();
	}

};