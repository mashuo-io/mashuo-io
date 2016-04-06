import {initialize} from 'redux-form';
import axios from '../utils/server-request.service';
import {fields} from './edit-course';
import {goBack} from 'react-router-redux';
import {mergeLikes} from '../like/likes.action';

export const setDoing = (prefix) => ({
		type: `${prefix}.SET_DOING`
	});

export const setDone = (prefix) => ({
		type: `${prefix}.SET_DONE`
	});

export const loadCourses = (prefix, courses) => ({
		type: `${prefix}.LOAD_COURSES`,
		courses
	});

export const loadCourse = (course) => ({
	type: `COURSE.LOAD_COURSE`,
	course
});

export const doFetchPublicCourses = () => dispatch => {
	dispatch(setDoing('COURSE_LIST'));

	axios.get('/courses')
	.then(function (response) {
		dispatch(loadCourses('COURSE_LIST', response.data));
		dispatch(setDone('COURSE_LIST'));
	})
};

export const doFetchMyCourses = () => dispatch => {
	dispatch(setDoing('MY_COURSE'));

	axios.get('/my-courses')
	.then(function (response) {
		dispatch(loadCourses('MY_COURSE', response.data));
		dispatch(setDone('MY_COURSE'));
	})
};

export const doFetchOneMyCourse = (courseId) => dispatch => {
	dispatch(setDoing('MY_COURSE'));
	axios.get(`/my-courses/${courseId}`)
	.then(response => response.data)
	.then(data=>{
		data.tags = data.tags.map((x, i) => ({id: i+1, text:x}));
		return data;
	})
	.then(data => {
		dispatch(initialize('course', data, fields));
		dispatch(setDone('MY_COURSE'));
	})
};

export const doFetchOneCourse = (courseId) => dispatch => {
	dispatch(setDoing('COURSE'));
	axios.get(`/courses/${courseId}`)
	.then(res=>res.data)
	.then(data=> {
		dispatch(loadCourse(data));
		dispatch(mergeLikes([{ refId:data._id, refType:'course', count:data.likes}]));
		dispatch(mergeLikes(data.videos.map(x=>({refType:'video', refId: x._id, count: x.likes}))));
		dispatch(setDone('COURSE'));
	});
};

export const doSaveMyCourse = (course) => dispatch => {
	dispatch(setDoing('MY_COURSE'));
	let c = Object.assign({}, course);
	c.tags = c.tags.map(x=>x.text);
	axios.post(`/my-courses`, c)
	.then(response => {
		dispatch(goBack());
	});
};
