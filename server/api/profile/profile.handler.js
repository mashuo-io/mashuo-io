import {subscribe} from '../shared/bus';
import {CourseWatchHistoryModel} from './profile.model';
import {CourseModel} from '../course/course.model';

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
	let video = course.videos.find(x=>x._id === videoId);

	let $set = {};
	$set[`videos.${videoId}`] = {
		_id: videoId,
		status: type === 'video-ended' ? 'watched' : 'watching',
		durationWatched: type === 'video-ended' ? video.duration : currentTime
	};

	let courseHistory = yield CourseWatchHistoryModel.findOneAndUpdate(
		{user, course: courseId},
		{
			$set,
			$setOnInsert: {user, course: courseId, createdOn: new Date, updatedOn: new Date}
		},
		{new: true, upsert: true}
	);

	yield CourseWatchHistoryModel.update(
		{user, course: courseId},
		{
			$set: {
				durationWatched: Object.keys(courseHistory.videos).reduce((ret, key) => ret + courseHistory.videos[key].durationWatched, 0)
			}
		});
}