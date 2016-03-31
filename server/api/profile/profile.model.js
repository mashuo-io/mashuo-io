import mongoose, {Schema} from 'mongoose';
import baseEntity from '../shared/base-entity';

export const CourseWatchHistoryModel = mongoose.model('courseWatchHistory', new mongoose.Schema(Object.assign({
	user: {type: Schema.Types.ObjectId, ref: 'account'},
	course: {type: Schema.Types.ObjectId, ref: 'course'},
	durationWatched: Number,
	progress: Number,
	videos: Schema.Types.Mixed
}, baseEntity)));
// videos used to be an array like the following, but we change to object in order to convenient update process
// videos: [
// 	{
// 		_id: Schema.Types.ObjectId,
// 		status: {type: String, enum: ['new', 'watching', 'watched']},
// 		durationWatched: Number
// 	}
// ]
