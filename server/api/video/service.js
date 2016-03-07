'use strict';
let VideoModel = require('./model').videoModel;

module.exports = {
	saveMyVideo: function * (){
		let body = this.request.body;
		let v = yield new VideoModel({
			name: body.name,
			description: body.description,
			episodes: body.episodes,
			createdBy: this.currentUser._id
		}).save();
		this.body = {_id: v._id};
	},

	getMyVideos: function *() {
		this.body = yield VideoModel.find({createdBy: this.currentUser._id}).lean();
	},

	getMyVideoById: function *() {
		let video = yield VideoModel
		.findOne({_id: this.params.id})
		.lean();

		if (!video) this.throw('Not found', 404);
		if (video.createdBy.toString() !== this.currentUser.id.toString()) this.throw('Forbidden', 403);

		this.body = video;
	},

	getVideos: function *() {
		this.body = yield VideoModel.find({}).lean();
	}

};