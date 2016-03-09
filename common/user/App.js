import React from 'react';
import {HeaderBS} from './layout/Header.js';
import Footer from './layout/Footer.js';
import '../styles/app.scss';

const Main = ()=> (
	<h2>main page</h2>
)

const App = (props) => (
	<div className="container-fluid">
		<HeaderBS></HeaderBS>

		{props.children}
	</div>
);

export default App;