import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App';
import Auth from './Auth';

module.exports = (
	<Route path="/" component={App}>
		<Route path="/auth" component={Auth} />
	</Route>
);