import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'
import { Provider }         from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose }  from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import auth from '../common/user/auth/auth.reducer';
import publicVideo from '../common/shared/video/public-video.reducer';
import myVideo from '../common/shared/video/my-video.reducer';
import userRoute from '../common/user/user.route';
import adminRoute from '../common/admin/admin.route';

const reducer = combineReducers({
	auth,
	publicVideo,
	myVideo
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