import React from 'react';
import {Link} from 'react-router';
import {Nav,Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

export class HeaderBS extends React.Component {
	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="/">码说</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<NavItem href="/video">最新视频</NavItem>
						<NavItem href="/my-video">我的视频</NavItem>
					</Nav>
					<Nav pullRight>
						<NavItem href="/">登陆</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}