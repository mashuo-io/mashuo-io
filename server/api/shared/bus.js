import EventEmitter from 'events';
import co from 'co';
let app = require('../../index');

class Emitter extends EventEmitter {}

const emitter = new Emitter();

export const publish = (eventName, data) => {
	emitter.emit(eventName, data);
};

export const subscribe = (eventName, generator) => {
	emitter.on(eventName, data=>co(function *() {
		yield generator(data);
	}).catch(error=>app.emit('error', error)));
};