import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './user/App';
import Auth from './user/auth';
import Home from './user/layout/Home';

import Admin from './admin/Admin';

module.exports = (
	<div>

		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="/auth" component={Auth} />
		</Route>

		<Route path="/admin" component={Admin}>
		</Route>

	</div>
);