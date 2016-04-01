import {CourseModel} from './course.model';

export function * saveMyCourse() {
	let {body} = this.request;
	let fields = {
		name: body.name,
		description: body.description,
		videos: body.videos.map(x=>Object.assign({}, x, {poster: `${x.src}?vframe/jpg/offset/1/w/640/h/360`})),
		createdBy: this.currentUser._id,
		duration: body.videos.reduce((ret, v) => ret + v.duration, 0),
		coverImageUrl: body.coverImageUrl,
		tags: body.tags
	};

	if (!body._id) {
		let newOne = yield new CourseModel(fields).save();
		this.body = {_id: newOne._id}
	} else {
		yield CourseModel.update({_id: body._id}, fields);
		this.body = {_id: body._id};
	}
}

export function * getMyCourses() {
	this.body = yield CourseModel
	.find({createdBy: this.currentUser._id})
	.sort({createdOn: -1})
	.lean();
}

export function * getMyCourseById() {
	let course = yield CourseModel
	.findOne({_id: this.params.id})
	.lean();

	if (!course) this.throw('Not found', 404);
	if (course.createdBy.toString() !== this.currentUser._id.toString()) this.throw('Forbidden', 403);

	course.tags = course.tags || [];
	this.body = course;
}

export function * getCourses() {
	this.body = yield CourseModel
	.find({})
	.sort({createdOn: -1})
	.lean();
}

export function * getCourse() {
	this.body = yield CourseModel
	.findOne({_id: this.params.id})
	.populate('createdBy', 'github.avatarUrl github.login')
	.lean();
}