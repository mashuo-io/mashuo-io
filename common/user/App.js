import React from 'react';
import {StyleNavbar, Header} from './layout/Header.js';
import Footer from './layout/Footer.js';
import '../styles/app.scss';

const Main = ()=> (
	<h2>main page</h2>
);

export default class App extends React.Component {
	render() {
        let showBackground = this.props.location.pathname === '/';
        console.log(this.props);
		return (
			<div >
				<Header showBackground={showBackground}></Header>
				{this.props.children}
			</div>
		)
	}
}