import React from 'react';
import App from './App';
import Auth from './auth';
import {Home} from './layout/Home';
import {Route, IndexRoute} from 'react-router';
import CourseList from '../shared/course/course-list';
import Course from '../shared/course/course';
import CourseIntro from '../shared/course/course-intro';
import MyCourse from '../shared/course/my-course-list';
import EditCourse from '../shared/course/edit-course';

module.exports = (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="auth" component={Auth} />
		<Route path="courses" component={CourseList} />
		<Route path="course/:id" component={Course} />
		<Route path="course-intro/:id" component={CourseIntro} />
		<Route path="my-course/new" component={EditCourse} />
		<Route path="my-course/edit/:id" component={EditCourse} />
		<Route path="my-courses" component={MyCourse} />
	</Route>
);