import React from 'react';
import {StyleNavbar} from './layout/Header.js';
import Footer from './layout/Footer.js';
import '../styles/app.scss';

const Main = ()=> (
	<h2>main page</h2>
);

export default class App extends React.Component {
	render() {
        let isHomePage = this.props.location.pathname === '/';
		return (
			<div className="app-container">
                {
                    isHomePage  ? (null) : (<StyleNavbar showBackground={false}></StyleNavbar>)
                }
                {
                    isHomePage ? (
                        <header>
                            <StyleNavbar showBackground={true}></StyleNavbar>
                            <div className="header-content">
                                <div className="header-content-inner">
                                    <h1>Your Favorite Source of Free Bootstrap Themes</h1>
                                    <hr/>
                                    <p>Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!</p>
                                </div>
                            </div>
                        </header>
                    )
                        : (null)
                }

				{this.props.children}
			</div>
		)
	}
}