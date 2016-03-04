import React from 'react';
import 'antd/style/index.less';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

const App = (props) => (
	<div>
		<Header></Header>
		{props.children}
		<Footer></Footer>
	</div>
);

export default App;