import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Admin from './Admin';

export default (
	<Route path="/admin" component={Admin}>
		<Route path="/admin/video" component={Admin} />
	</Route>
)