import React from 'react';
import App from './App';
import Auth from './auth';
import {Home} from './layout/Home';
import {Route, IndexRoute} from 'react-router';
import CourseList from '../shared/course/CourseList';
import Course from '../shared/course/Course';
import MyCourse from '../shared/course/MyCourseList';
import EditCourse from '../shared/course/EditCourse';

module.exports = (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="auth" component={Auth} />
		<Route path="courses" component={CourseList} />
		<Route path="courses/:id" component={Course} />
		<Route path="my-courses/new" component={EditCourse} />
		<Route path="my-courses/edit/:id" component={EditCourse} />
		<Route path="my-courses" component={MyCourse} />
	</Route>
);