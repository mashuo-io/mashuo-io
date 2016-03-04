import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'
import routes from '../common/routes'
import { Provider }         from 'react-redux';
import { createStore, combineReducers, applyMiddleware }  from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import auth from '../common/user/auth/auth.reducer';

const reducer = combineReducers({auth});

const loggerMiddleware = createLogger();
const store = createStore(
	reducer,
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