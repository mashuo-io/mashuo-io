import React from 'react';
import {Link} from 'react-router';
import {Nav,Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

export class HeaderBS extends React.Component {
	render() {
		return (
			<Navbar inverse>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">React-Bootstrap</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<NavItem eventKey={1} href="#">Link</NavItem>
						<NavItem eventKey={2} href="#">Link</NavItem>
						<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
							<MenuItem eventKey={3.1}>Action</MenuItem>
							<MenuItem eventKey={3.2}>Another action</MenuItem>
							<MenuItem eventKey={3.3}>Something else here</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={3.3}>Separated link</MenuItem>
						</NavDropdown>
					</Nav>
					<Nav pullRight>
						<NavItem eventKey={1} href="#">Link Right</NavItem>
						<NavItem eventKey={2} href="#">Link Right</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

//export class Header2 extends React.Component {
//	render() {
//		return (
//			<header className="am-topbar am-topbar-fixed-top">
//				<div className="am-container">
//
//					<h1 className="am-topbar-brand">
//						<a href="#"> 码 说 </a>
//					</h1>
//
//					<button className="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-secondary am-show-sm-only"
//							data-am-collapse="{target: '#collapse-head'}"><span className="am-sr-only">导航切换</span> <span className="am-icon-bars"></span></button>
//
//					<div className="am-collapse am-topbar-collapse" id="collapse-head">
//
//						<ul className="am-nav am-nav-pills am-topbar-nav">
//							<li className="am-active"><a href="#">主页</a></li>
//							<li><a href="#">视频</a></li>
//							<li><a href="#">我的视频</a></li>
//							<li className="am-dropdown" data-am-dropdown>
//								<a className="am-dropdown-toggle" data-am-dropdown-toggle href="javascript:;">
//									下拉菜单 <span className="am-icon-caret-down"></span>
//								</a>
//								<ul className="am-dropdown-content">
//									<li className="am-dropdown-header">标题</li>
//									<li><a href="#">1. 默认样式</a></li>
//									<li><a href="#">2. 基础设置</a></li>
//									<li><a href="#">3. 文字排版</a></li>
//									<li><a href="#">4. 网格系统</a></li>
//								</ul>
//							</li>
//						</ul>
//
//						<div className="am-topbar-right">
//							<button className="am-btn am-btn-primary am-topbar-btn am-btn-sm"><span className="am-icon-github"></span> 登录 </button>
//						</div>
//					</div>
//
//				</div>
//			</header>
//		)
//	}
//}

//export class Get extends React.Component {
//	render(){
//		return (
//			<div className="get">
//				<div className="am-g">
//					<div className="am-u-lg-12">
//						<h1 className="get-title">Amaze UI - HTML5 跨屏前端框架</h1>
//
//						<p>
//							期待你的参与，共同打造一个简单易用的前端框架
//						</p>
//
//						<p>
//							<a href="http://amazeui.org" className="am-btn am-btn-sm get-btn">获取新get技能√</a>
//						</p>
//					</div>
//				</div>
//			</div>
//		)
//	}
//}

//export class Detail extends React.Component {
//	render(){
//		return (
//			<div className="detail">
//				<div className="am-g am-container">
//					<div className="am-u-lg-12">
//						<h2 className="detail-h2">One Web 、Any Device，期待和你一起去实现!</h2>
//
//						<div className="am-g">
//							<div className="am-u-lg-3 am-u-md-6 am-u-sm-12 detail-mb">
//
//								<h3 className="detail-h3">
//									<i className="am-icon-mobile am-icon-sm"></i>
//									为移动而生
//								</h3>
//
//								<p className="detail-p">
//									Amaze UI 采用业内先进的 mobile first 理念，从小屏逐步扩展到大屏，最终实现所有屏幕适配，适应移动互联潮流。
//								</p>
//							</div>
//							<div className="am-u-lg-3 am-u-md-6 am-u-sm-12 detail-mb">
//								<h3 className="detail-h3">
//									<i className="am-icon-cogs am-icon-sm"></i>
//									组件丰富，模块化
//								</h3>
//
//								<p className="detail-p">
//									Amaze UI 含近 20 个 CSS 组件、10 个 JS 组件，更有 17 款包含近 60 个主题的 Widgets，可快速构建界面出色、体验优秀的跨屏页面，大幅度提升你的开发效率。
//								</p>
//							</div>
//							<div className="am-u-lg-3 am-u-md-6 am-u-sm-12 detail-mb">
//								<h3 className="detail-h3">
//									<i className="am-icon-check-square-o am-icon-sm"></i>
//									本地化支持
//								</h3>
//
//								<p className="detail-p">
//									相比国外的前端框架，Amaze UI 专注解决中文排版优化问题，根据操作系统调整字体，实现最佳中文排版效果；针对国内主流浏览器及 App 内置浏览器提供更好的兼容性支持，为你节省大量兼容性调试时间。
//								</p>
//							</div>
//							<div className="am-u-lg-3 am-u-md-6 am-u-sm-12 detail-mb">
//								<h3 className="detail-h3">
//									<i className="am-icon-send-o am-icon-sm"></i>
//									轻量级，高性能
//								</h3>
//
//								<p className="detail-p">
//									Amaze UI 非常注重性能，基于轻量的 Zepto.js 开发，并使用 CSS3 来做动画交互，平滑、高效，更适合移动设备，让你的 Web 应用可以高速载入。
//								</p>
//							</div>
//						</div>
//					</div>
//				</div>
//			</div>
//		)
//	}
//}

//export class Hope extends React.Component {
//	render() {
//		return (
//			<div className="hope">
//				<div className="am-g am-container">
//					<div className="am-u-lg-4 am-u-md-6 am-u-sm-12 hope-img">
//						<img src="assets/landing.png" alt="" data-am-scrollspy="{animation:'slide-left', repeat: false}" />
//							<hr className="am-article-divider am-show-sm-only hope-hr"/>
//					</div>
//					<div className="am-u-lg-8 am-u-md-6 am-u-sm-12">
//						<h2 className="hope-title">同我们一起打造你的前端框架</h2>
//
//						<p>
//							在知识爆炸的年代，我们不愿成为知识的过客，拥抱开源文化，发挥社区的力量，参与到Amaze Ui开源项目能获得自我提升。
//						</p>
//					</div>
//				</div>
//			</div>
//		)
//	}
//}

