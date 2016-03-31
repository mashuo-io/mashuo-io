import {EventModel} from './event.model';
import {checkRouteError} from '../shared/util';
import v from 'validate-obj';
import {publish} from '../shared/bus';

export function * saveEvent() {
	checkRouteError(this, {
		type: [v.isString, v.required],
		data: v.isObject
	}, this.request.body);

	let  {type, data} = this.request.body;
	let {_id: user, clientId} = this.currentUser;

	yield new EventModel({type, data, user, clientId}).save();
	this.body = {done: true};

	if (user) publish(type, {...data, user, clientId});
}