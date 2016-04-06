import {CourseModel} from './course.model';
import {FeedbackStatModel} from '../feedback/feedback.model';

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
	let {_id} = this.params;
	let course = yield CourseModel
	.findOne({_id})
	.populate('createdBy', 'github.avatarUrl github.login')
	.lean();

	let courseFeedBackStat = yield FeedbackStatModel.findOne({refType: 'course', refId: _id}, {_id: 0, likes:1, comments: 1}).lean();
	let videosFeedBackStat = yield FeedbackStatModel.find({refType: 'video', refId: {$in: course.videos.map(x=>x._id)}}, {_id: 0, refId: 1, likes:1, comments: 1}).lean();
	
	course.videos.forEach(x=> {
		let {likes, comments} = videosFeedBackStat.find(y=>y.refId.toString() === x._id.toString()) || {likes: 0, comments: 0};
		Object.assign(x, {likes, comments});
	});

	this.body = Object.assign(course, courseFeedBackStat);
}