import React from 'react';
import {StyleNavbar} from './layout/Header.js';
import Footer from './layout/Footer.js';
import '../styles/app.scss';
import MainContentWrapper from './layout/ContentWrapper';

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
                                    <h1>分享你的知识, 让代码说话</h1>
                                    <hr/>
                                    <p>一个前沿WEB技术短视频学习工厂</p>
                                </div>
                            </div>
                        </header>
                    )
                        : (null)
                }

                <MainContentWrapper>
				    {this.props.children}
                </MainContentWrapper>
			</div>
		)
	}
}