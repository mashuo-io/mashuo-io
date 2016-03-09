import React from 'react';
import {Link} from 'react-router';
import {Nav,Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import AuthButton from '../auth/index';

export class StyleNavbar extends React.Component {
	render() {
		return (
			<Navbar fixedTop>
				<Navbar.Header>
					<Navbar.Brand>
						<LinkContainer to="/"><a >码说</a></LinkContainer>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
                        <LinkContainer to="/video">
                            <NavItem className="round-border">我想说</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/video">
                            <NavItem >最新视频</NavItem>
                        </LinkContainer>
						<AuthButton />
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="container">
                    <div className="intro-text">
                        <div className="intro-lead-in">Welcome To Our Studio!</div>
                        <div className="intro-heading">It's Nice To Meet You</div>
                        <a href="#" className="page-scroll btn btn-xl">Tell Me More</a>
                    </div>
                </div>
            </header>
        )
    }
}