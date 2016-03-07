import React from 'react';
import {Link} from 'react-router';
import {Topbar, Nav, CollapsibleNav, NavItem, Icon} from 'react-bootstrap';

export default ()=>(
	<Topbar brand="码说" toggleNavKey="nav">
		<CollapsibleNav eventKey="nav">
			<Nav topbar>
				<NavItem ><Link to="/admin"><Icon type="home" />主页</Link></NavItem>
				<NavItem ><Link to="/admin/video"><Icon type="video-camera" />视频</Link></NavItem>
				<NavItem ><Link to="/admin/user"><Icon type="user" />用户</Link></NavItem>
			</Nav>
		</CollapsibleNav>
	</Topbar>

);