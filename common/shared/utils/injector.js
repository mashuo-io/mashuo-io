let store;

export const connectStore = x=>store=x;

export const inject = (storeToProps, dispatchToProps) => oneClass => {
	let update = ()=>{
		oneClass.prototype.props = Object.assign({}, storeToProps(store.getState()), dispatchToProps(store.dispatch));
	};
	store.subscribe(update);
	update();
	return oneClass;
};
