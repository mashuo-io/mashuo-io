import {CourseWatchHistoryModel} from './profile.model';
import './profile.handler';
import _ from 'lodash';

export function * getMyWatchHistories() {
	let ret = yield CourseWatchHistoryModel.find({user: this.currentUser._id}).lean();
	this.body = ret.map(cleanUp);
}

export function * getMyWatchHistoryById() {
	let {courseId} = this.params;
	let ret = (yield CourseWatchHistoryModel.findOne({user: this.currentUser._id, course: courseId}).lean())
		|| {status: 'new',  durationWatched:0, videos: {}};
	this.body = cleanUp(ret);
}

const cleanUp = x=>_.omit(x, ['__v', '_id', 'createdOn', 'updatedOn', 'user']);