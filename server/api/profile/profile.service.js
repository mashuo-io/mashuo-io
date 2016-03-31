import {CourseWatchHistoryModel} from './profile.model';
import {CourseModel} from '../course/course.model';
import {checkRouteError} from '../shared/util';
import v from 'validate-obj';
import './profile.handler';

export function * getMyWatchHistories() {
	this.body = (yield CourseWatchHistoryModel.find({user: this.currentUser._id}).lean());
}

export function * getMyWatchHistoryById() {
	let {courseId} = this.params;
	this.body = (yield CourseWatchHistoryModel.findOne({user: this.currentUser._id, course: courseId}).lean()) 
		|| {status: 'new',  durationWatched:0, videos: {}};
}