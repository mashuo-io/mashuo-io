import mongoose, {Schema} from 'mongoose';
import baseEntity from '../shared/base-entity';
import _ from 'lodash';

export const EventModel = mongoose.model('event', new Schema(_.extend({
		clientId: {type: String, trim: true},
		user: {type:Schema.Types.ObjectId, ref:'account'},
		type: String,
		data: Schema.Types.Mixed
	}, baseEntity))
);