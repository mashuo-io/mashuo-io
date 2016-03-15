import {inject,connectStore} from './injector';
import {expect} from 'chai';
import {createStore} from 'redux';

describe('injector', () => {
	let store;

	beforeEach(()=>{
		store = createStore((state={}, action) => {
			let ret = Object.assign({}, state, {name: action.name});
			return ret;
		});
		store.dispatch({type: 'fd', name:'ron'});
		connectStore(store);
	});

	it('inject should work', () => {

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
});