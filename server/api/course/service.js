'use strict';
let VideoModel = require('./model').videoModel;

module.exports = {
	saveMyCourse: function * (){
		let body = this.request.body;
		let fields = {
			name: body.name,
			description: body.description,
			episodes: body.episodes,
			createdBy: this.currentUser._id
		};

		if (! body._id) {
			let newOne = yield new VideoModel(fields).save();
			this.body = {_id: newOne._id}
		} else {
			yield VideoModel.update({_id: body._id}, fields);
			this.body = {_id: body._id};
		}
	},

	getMyCourses: function *() {
		this.body = yield VideoModel
		.find({createdBy: this.currentUser._id})
		.sort({createdOn: -1})
		.lean();
	},

	getMyCourseById: function *() {
		let video = yield VideoModel
		.findOne({_id: this.params.id})
		.lean();

		if (!video) this.throw('Not found', 404);
		if (video.createdBy.toString() !== this.currentUser.id.toString()) this.throw('Forbidden', 403);

		this.body = video;
	},

	getCourses: function *() {
		this.body = yield VideoModel
		.find({})
		.sort({createdOn: -1})
		.lean();
	},

	getCourse: function *() {
		this.body = yield VideoModel
		.findOne({_id: this.params.id})
		.lean();
	}
};