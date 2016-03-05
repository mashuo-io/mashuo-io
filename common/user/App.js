import React from 'react';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';
import 'amazeui/less/amazeui.less';

const Main = ()=> (
	<h2>main page</h2>
)

const App = (props) => (
	<div>
		<Header></Header>
		{props.children}
		<Footer></Footer>
	</div>
);

export default App;