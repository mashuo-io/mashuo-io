import {CourseWatchHistoryModel, FavoriteCourseModel} from './profile.model';
import './profile.handler';
import _ from 'lodash';

export function * getMyWatchHistories() {
	let histories = yield CourseWatchHistoryModel.find({user: this.currentUser._id}).lean();
	this.body = histories.map(cleanUp);
}

export function * getMyWatchHistoryById() {
	let {courseId} = this.params;
	let history = (yield CourseWatchHistoryModel.findOne({user: this.currentUser._id, course: courseId}).lean())
		|| {status: 'new',  durationWatched:0, videos: {}};
	this.body = cleanUp(history);
}

export function * getMyFavorites () {
	let favorites = yield FavoriteCourseModel.find({user: this.currentUser._id}).lean();
	this.body = favorites.map(cleanUp).map(correctFavorite);
}

export function * getMyFavoriteById () {
	let {courseId} = this.params;
	let favorite = (yield FavoriteCourseModel.findOne({user: this.currentUser._id, course: courseId}).lean())
		|| {course: courseId, videos: {}};
	this.body = correctFavorite(cleanUp(favorite));
}

const cleanUp = x=>_.omit(x, ['__v', '_id', 'createdOn', 'updatedOn', 'user']);
const correctFavorite = x => {
	Object.keys(x.videos || {}).forEach(y=>x.videos[y] = (x.videos[y] || 0) % 2 === 1);
	return x;
};