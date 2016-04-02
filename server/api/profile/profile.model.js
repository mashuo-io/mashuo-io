import mongoose, {Schema} from 'mongoose';
import baseEntity from '../shared/base-entity';

export const CourseWatchHistoryModel = mongoose.model('courseWatchHistory', new mongoose.Schema(Object.assign({
	user: {type: Schema.Types.ObjectId, ref: 'account'},
	course: {type: Schema.Types.ObjectId, ref: 'course'},
	durationWatched: Number,
	progress: Number,
	videos: Schema.Types.Mixed
}, baseEntity)));
// videos used to be an array, but we change to object in order to convenient update process
// videos: {
//
// 		`Schema.Types.ObjectId`: {
//          status: {type: String, enum: ['new', 'watching', 'watched']},
//          durationWatched: Number
//      },
// }

export const FavoriteCourseModel = mongoose.model('favoriteCourse', new mongoose.Schema(Object.assign({
	user: {type: Schema.Types.ObjectId, ref: 'account'},
	course: {type: Schema.Types.ObjectId, ref: 'course'},
	videos: {type: Schema.Types.Mixed, default: {}}
}, baseEntity)));
// videos used to be an array, but we change to object in order to convenient update process.
// and more, inside object, for each property, name will be the videoId, value will be how many time it is triggered, so
// undefined or even number means un-favorite, and odd number means favorite one.
// videos: {
// 	'fdsa': 4,  // 'fdsa' is NOT favorite
// 	'2d24': 1   // '2d24' is favorite
//              // '345d' is NOT favorite
// }

