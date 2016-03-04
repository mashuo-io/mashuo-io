import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';

export default (props) => (
	<div>
		<Header />
		{props.children}
		<Footer />
	</div>
)