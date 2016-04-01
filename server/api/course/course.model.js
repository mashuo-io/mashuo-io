import mongoose, {Schema} from 'mongoose';
import baseEntity from '../shared/base-entity';
import _ from 'lodash';

export const CourseModel = mongoose.model('course', new Schema(_.extend({
		name: String,
		description: String,
		createdBy: {type:Schema.Types.ObjectId, ref:'account'},
		videos: [
			{
				name: String,
				src: String,
				poster: String,
				duration: Number,
				timesWatched: { type: Number, default: 0}
			}
		],
		coverImageUrl: String,
		tags: [String],
		duration: Number,
		status: {type: String, enum: ['new', 'published']}
	}, baseEntity))
);