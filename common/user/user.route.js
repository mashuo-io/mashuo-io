import React from 'react';
import App from './App';
import Auth from './auth';
import {Home} from './layout/Home';
import {Route, IndexRoute} from 'react-router';
import VideoList from '../shared/video/VideoList';
import Video from '../shared/video/Video';
import MyVideo from '../shared/video/MyVideoList';
import EditVideo from '../shared/video/EditVideo';

module.exports = (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="auth" component={Auth} />
		<Route path="courses" component={VideoList} />
		<Route path="courses/:id" component={Video} />
		<Route path="my-courses/new" component={EditVideo} />
		<Route path="my-courses/edit/:id" component={EditVideo} />
		<Route path="my-courses" component={MyVideo} />
	</Route>
);