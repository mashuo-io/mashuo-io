import React from 'react';
import {StyleNavbar, Header} from './layout/Header.js';
import Footer from './layout/Footer.js';
import '../styles/app.scss';

const Main = ()=> (
	<h2>main page</h2>
);

const App = (props) => (
	<div >
		<StyleNavbar></StyleNavbar>
		{props.children}
	</div>
);

export default App;