import React from 'react';
import {Link} from 'react-router';
import {Nav,Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export class HeaderBS extends React.Component {
	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<LinkContainer to="/">
							<a >码说</a>
						</LinkContainer>

					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<LinkContainer to="/my-video">
							<NavItem >我的视频</NavItem>
						</LinkContainer>
					</Nav>
					<Nav pullRight>
						<LinkContainer to="/">
							<NavItem href="/">登陆</NavItem>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}