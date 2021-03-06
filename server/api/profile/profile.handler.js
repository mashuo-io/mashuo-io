import {subscribe} from '../shared/bus';
import {CourseWatchHistoryModel, FavoriteCourseModel} from './profile.model';
import {CourseModel} from '../course/course.model';
import {o} from '../shared/util';

subscribe('video-favoriteToggled', function * ({user, courseId, videoId}){
	yield FavoriteCourseModel.update(
		{user, course: courseId},
		{
			$inc: o(`videos.${videoId}`, 1),
			$setOnInsert: {user, course: courseId, createdOn: new Date, updatedOn: new Date}
		},
		{upsert: true}
	)
});

subscribe('video-times', function * ({courseId, videoId}) { // 计算 video的播放次数
	yield CourseModel.findOneAndUpdate(
		{ _id: courseId, 'videos._id': videoId},
		{ $inc: { 'videos.$.timesWatched' : 1 } }
	);
});

subscribe('video-ended', function * (data) {
	console.log('video-ended');
	yield calculateHistory('video-ended', data);
});

subscribe('video-timeupdate', function * (data) {
	console.log('video-timeupdate');
	yield calculateHistory('video-timeupdate', data);
});

function * calculateHistory(type, {user, videoId, courseId, currentTime}) {
	console.log('calculating');
	let course = yield CourseModel.findOne({_id: courseId}).lean();
	let video = course.videos.find(x=>x._id == videoId);

	let courseHistory = yield CourseWatchHistoryModel.findOneAndUpdate(
		{user, course: courseId},
		{
			$set: o(`videos.${videoId}`, {
				status: type === 'video-ended' ? 'watched' : 'watching',
				durationWatched: type === 'video-ended' ? video.duration : currentTime
			}),
			$setOnInsert: {user, course: courseId, createdOn: new Date, updatedOn: new Date}
		},
		{new: true, upsert: true}
	);

	let durationWatched = Object.keys(courseHistory.videos).reduce((ret, key) => ret + courseHistory.videos[key].durationWatched, 0);
	yield CourseWatchHistoryModel.update(
		{user, course: courseId},
		{
			$set: {
				durationWatched,
			}
		});
}