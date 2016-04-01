import React from 'react';
import {Link} from 'react-router';
import {Nav,Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import AuthButton from '../auth/index';
import Waypoint from 'react-waypoint';
import classNames from 'classnames';

export class StyleNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hide:false};
    }
	render() {
        let classes = classNames( this.props.className, {
            "hidden": this.props.hide,
            "no-background-image": !this.props.showBackground
        } );
		return (
			<Navbar fixedTop={false} fluid className = {classes}>
				<Navbar.Header>
					<Navbar.Brand>
						<LinkContainer to="/"><a >码说</a></LinkContainer>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
                        <LinkContainer to="/courses">
                            <NavItem >最新视频</NavItem>
                        </LinkContainer>
						<AuthButton />
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

StyleNavbar.propTypes = {
    hide: React.PropTypes.bool
};
