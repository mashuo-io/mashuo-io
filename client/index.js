import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'
import routes from '../common/routes'
import { Provider }         from 'react-redux';
import { createStore, combineReducers, applyMiddleware }  from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import auth from '../common/auth/auth.reducer';

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
		<Router routes={routes} history={browserHistory}/>
	</Provider>,
	document.getElementById('app')
);