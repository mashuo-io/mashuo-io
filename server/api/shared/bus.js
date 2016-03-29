import EventEmitter from 'events';

class Emitter extends EventEmitter {}

const emitter = new Emitter();

export const publish = (eventName, data) => {
	emitter.emit(eventName, data);
};

export const subscribe = (eventName, handler) => {
	emitter.on(eventName, handler);
};