import React from 'react';
import App from './App';
import Auth from './auth';
import {Home} from './layout/Home';
import {Route, IndexRoute} from 'react-router';
import VideoList from '../shared/video/VideoList';
import Video from '../shared/video/Video';
import MyVideo from '../shared/video/MyVideoList';
import EditVideo from '../shared/video/EditVideo';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="auth" component={Auth} />
		<Route path="videos" component={VideoList} />
		<Route path="video/:id" component={Video} />
		<Route path="my-video/new" component={EditVideo} />
		<Route path="my-video/edit/:id" component={EditVideo} />
		<Route path="my-videos" component={MyVideo} />
	</Route>
);