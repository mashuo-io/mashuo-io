'use strict';
let CourseModel = require('./model').courseModel;

module.exports = {
	saveMyCourse: function * (){
		let body = this.request.body;
		let fields = {
			name: body.name,
			description: body.description,
			videos: body.videos,
			createdBy: this.currentUser._id
		};

		if (! body._id) {
			let newOne = yield new CourseModel(fields).save();
			this.body = {_id: newOne._id}
		} else {
			yield CourseModel.update({_id: body._id}, fields);
			this.body = {_id: body._id};
		}
	},

	getMyCourses: function *() {
		this.body = yield CourseModel
		.find({createdBy: this.currentUser._id})
		.sort({createdOn: -1})
		.lean();
	},

	getMyCourseById: function *() {
		let course = yield CourseModel
		.findOne({_id: this.params.id})
		.lean();

		if (!course) this.throw('Not found', 404);
		if (course.createdBy.toString() !== this.currentUser.id.toString()) this.throw('Forbidden', 403);

		this.body = course;
	},

	getCourses: function *() {
		this.body = yield CourseModel
		.find({})
		.sort({createdOn: -1})
		.lean();
	},

	getCourse: function *() {
		this.body = yield CourseModel
		.findOne({_id: this.params.id})
		.lean();
	}
};