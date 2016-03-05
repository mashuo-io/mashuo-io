import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'
import { Provider }         from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose }  from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import auth from '../common/user/auth/auth.reducer';
import video from '../common/shared/video/video.reducer';
import userRoute from '../common/user/user.route';
import adminRoute from '../common/admin/admin.route';


const reducer = combineReducers({
	auth,
	video
});

const store = compose(
	applyMiddleware(
		thunkMiddleware,
		createLogger()
	)
)(createStore)(reducer);

render (<Provider store={store}>
			<Router history={browserHistory} routes={userRoute} />
		</Provider>,
	document.getElementById('app')
);