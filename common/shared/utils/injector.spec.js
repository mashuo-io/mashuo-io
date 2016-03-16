import {inject,connectStore, cleanUp} from './injector';
import {expect} from 'chai';
import {createStore} from 'redux';

describe('injector in the case connect store goes first', () => {
	let store;

	beforeEach(()=>{
		cleanUp();
		store = createStore((state={}, action) => {
			let ret = Object.assign({}, state, {name: action.name});
			return ret;
		});
		store.dispatch({type: 'fd', name:'ron'});
		connectStore(store);
	});

	it('inject class should work', () => {

		@inject(
			store=>({name: store.name}),
			dispatch=>({
				rename: newName=>dispatch({type: 'fd', name: newName})
			})
		)
		class notification {
			notify() {
				expect(this.props.name).to.eql('ron');
			}

			changeName() {
				this.props.rename('liu');
				expect(this.props.name).to.eql('liu');
			}
		}

		let nort = new notification();
		nort.notify();
		nort.changeName();
	});
	it('inject object should work', () => {
		let config = {};
		inject(
			store=>({name: store.name}),
			dispatch=>({
				rename: newName=>dispatch({type: 'fd', name: newName})
			})
		)(config);

		expect(config.props.name).to.eql('ron');
		config.props.rename('liu');
		expect(config.props.name).to.eql('liu');
	});
});

describe('injector in the case connect store goes afterwords', () => {
	let store;

	beforeEach(()=>{
		cleanUp();
		store = createStore((state={}, action) => {
			let ret = Object.assign({}, state, {name: action.name});
			return ret;
		});
		store.dispatch({type: 'fd', name:'ron'});

	});

	it('inject class should work', (done) => {

		@inject(
			store=>({name: store.name}),
			dispatch=>({
				rename: newName=>dispatch({type: 'fd', name: newName})
			})
		)
		class notification {
			notify() {
				setTimeout(()=>{
					expect(this.props.name).to.eql('ron');
					done();
				});
			}
		}
		connectStore(store);

		let nort = new notification();
		nort.notify();
	});

	it('inject class should work for changes', (done) => {
		@inject(
			store=>({name: store.name}),
			dispatch=>({
				rename: newName=>dispatch({type: 'fd', name: newName})
			})
		)
		class notification {
			notify() {
				setTimeout(()=>{
					this.props.rename('liu');
					setTimeout(()=>{
						expect(this.props.name).to.eql('liu');
						done();
					}, 1);
				});
			}
		}
		connectStore(store);

		let nort = new notification();
		nort.notify();
	});

	it('inject object should work', (done) => {
		let config = {};
		inject(
			store=>({name: store.name}),
			dispatch=>({
				rename: newName=>dispatch({type: 'fd', name: newName})
			})
		)(config);

		connectStore(store);

		setTimeout(()=>{
			expect(config.props.name).to.eql('ron');
			done();
		});
	});

	it('inject object should work for changes', (done) => {
		let config = {};
		inject(
			store=>({name: store.name}),
			dispatch=>({
				rename: newName=>dispatch({type: 'fd', name: newName})
			})
		)(config);

		connectStore(store);

		setTimeout(()=>{
			config.props.rename('liu');
			setTimeout(()=>{
				expect(config.props.name).to.eql('liu');
				done();
			});
		});
	});
});