let storeResolve;
let store;
let storePromise;

export const connectStore = x=>{
	store = x;
	storeResolve(x);
};

export const cleanUp = ()=> {
	store = undefined;
	storePromise = new Promise(resolve=>storeResolve = resolve);
};

cleanUp();

export const inject = (stateToProps = ()=>{}, dispatchToProps = ()=>{}) => element => {
	let update = () => {
		let props = Object.assign({}, stateToProps(store.getState()), dispatchToProps(store.dispatch));
		if (typeof element === 'function')	{
			element.prototype.props = Object.assign(element.prototype.props || {}, props);
		}
		else if (typeof element === 'object') {
			element.props = Object.assign(element.props || {}, props);
		}
	};
	if (store) {
		store.subscribe(update);
		update();
	} else {
		storePromise.then(x => {
			x.subscribe(update);
			update();
		});
	}
	return element;
};
