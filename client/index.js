import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'
import { Provider }         from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose }  from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form';

import auth from '../common/user/auth/auth.reducer';
import publicVideoList from '../common/shared/video/public-video-list.reducer';
import publicVideo from '../common/shared/video/public-video.reducer';
import myVideo from '../common/shared/video/my-video.reducer';
import userRoute from '../common/user/user.route';
import adminRoute from '../common/admin/admin.route';

const reducer = combineReducers({
	auth,
	publicVideoList,
	publicVideo,
	myVideo,
	routing: routerReducer,
	form: formReducer
});

const store = compose(
	applyMiddleware(
		thunkMiddleware,
		routerMiddleware(browserHistory),
		createLogger()
	)
)(createStore)(reducer);

const history = syncHistoryWithStore(browserHistory, store);
render (<Provider store={store}>
			<Router history={history} routes={userRoute} />
		</Provider>,
	document.getElementById('app')
);