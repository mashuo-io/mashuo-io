import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'
import { Provider }         from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose}  from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form';
import {connectStore} from '../common/shared/utils/injector';

import auth from '../common/user/auth/auth.reducer';
import courseHistories from '../common/user/profile/course-histories.reducer';
import courseFavorites from '../common/user/profile/course-favorites.reducer';
import myLikes from '../common/user/profile/my-likes.reducer';
import config from '../common/shared/config/config.reducer';
import {loadConfig} from '../common/shared/config/config.action';
import publicCourseList from '../common/shared/course/public-course-list.reducer';
import publicCourse from '../common/shared/course/public-course.reducer';
import myCourse from '../common/shared/course/my-course.reducer';

const reducer = combineReducers({
	config,
	auth,
	courseHistories,
	courseFavorites,
	myLikes,
	publicCourseList,
	publicCourse,
	myCourse,
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

connectStore(store);
store.dispatch(loadConfig({})); // go with init state
const history = syncHistoryWithStore(browserHistory, store);

render (<Provider store={store}>
			{/* Intentionally use require instead of import. Because import will goes very first for any scripts even it is afterwards, therefore, the inject setup I wrote will goes after services instantiates  */}
			<Router history={history} routes={require('../common/user/user.route')} />
		</Provider>,
	document.getElementById('app')
);