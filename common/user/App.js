import React from 'react';
import {HeaderBS} from './layout/Header.js';
import Footer from './layout/Footer.js';
import '../styles/app.scss';

const Main = ()=> (
	<h2>main page</h2>
)

const App = (props) => (
	<div>
		<HeaderBS></HeaderBS>

        {/*
		<div className="am-container">
			{props.children}
		</div>
        */}
	</div>
);

export default App;