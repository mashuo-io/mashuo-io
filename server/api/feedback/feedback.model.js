import mongoose, {Schema}  from 'mongoose';
import _ from 'lodash';
import config from '../../config/config';
import baseEntity from '../shared/base-entity';

export const FeedbackModel = mongoose.model('feedback', new Schema(_.extend({
	refType: {type: String, trim: true, enum:config.likeableRefTypes},
	refId:  {type: Schema.Types.ObjectId},
	type: {type:String, trim: true, enum: ['comment', 'like']},
	comment: {type:String, trim:true},
	user: {type: Schema.Types.ObjectId, ref:'account'}
}, baseEntity)));

export const FeedbackStatModel = mongoose.model('feedbackStat', new Schema(_.extend({
	refType: {type: String, trim: true, enum:config.likeableRefTypes},
	refId:  {type: Schema.Types.ObjectId},
	likes: {type: Number, default: 0},
	comments: {type: Number, default: 0}
}, baseEntity)));
