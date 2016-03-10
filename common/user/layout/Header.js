import React from 'react';
import {Link} from 'react-router';
import {Nav,Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import AuthButton from '../auth/index';

export class StyleNavbar extends React.Component {
	render() {
		return (
			<Navbar fluid>
				<Navbar.Header>
					<Navbar.Brand>
						<LinkContainer to="/"><a >码说</a></LinkContainer>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
                        <LinkContainer to="/videos">
                            <NavItem className="round-border">我想说</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/videos">
                            <NavItem >最新视频</NavItem>
                        </LinkContainer>
						<AuthButton />
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

