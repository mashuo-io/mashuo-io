import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'
import { Provider }         from 'react-redux';
import { createStore, combineReducers, applyMiddleware }  from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import auth from '../common/user/auth/auth.reducer';

import userRoute from '../common/user/user.route';
import adminRoute from '../common/admin/admin.route';

const reducer = combineReducers({auth});

let initialState = {};
const loggerMiddleware = createLogger();
const store = createStore(
	reducer,
	initialState,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);

render (
	<Provider store={store}>
		<Router history={browserHistory}>
			{userRoute}
			{adminRoute}
		</Router>
	</Provider>,
	document.getElementById('app')
);