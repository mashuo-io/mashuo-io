import React from 'react';
import App from './App';
import Auth from './auth';
import Home from './layout/Home';
import {Route, IndexRoute} from 'react-router';
import Video from '../shared/video/VideoList';
import MyVideo from '../shared/video/MyVideoList';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="auth" component={Auth} />
		<Route path="video" component={Video} />
		<Route path="my-video" component={MyVideo} />
	</Route>
);