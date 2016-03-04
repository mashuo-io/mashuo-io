import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Admin from './Admin';
import Video from './video/video';
import Home from './layout/Home';
import User from './user/user';

export default (
	<Route path="/admin" component={Admin}>
		<IndexRoute components={Home} />
		<Route path="/admin/video" component={Video} />
		<Route path="/admin/user" component={User} />
	</Route>
)