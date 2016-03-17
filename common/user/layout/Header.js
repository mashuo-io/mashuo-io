import React from 'react';
import {Link} from 'react-router';
import {Nav,Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import AuthButton from '../auth/index';
import Waypoint from 'react-waypoint';
import classNames from 'classnames';

export class StyleNavbar extends React.Component {
    constructor(props) {
        super(props)
    }
	render() {
        let classes = classNames( this.props.className, {
            "hidden": this.props.hide,
            "no-background-image": !this.props.fixedTop
        } );
		return (
			<Navbar fixedTop={this.props.fixedTop} fluid className = {classes}>
				<Navbar.Header>
					<Navbar.Brand>
						<LinkContainer to="/"><a >码说</a></LinkContainer>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
                        <LinkContainer to="/courses">
                            <NavItem >我想说</NavItem>
                        </LinkContainer>

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


export class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {hide:false};
    }

    showNavbar (hide) {
        this.setState({ hide: hide });
    }

    render() {
        let {showBackground} = this.props;
        return(
            <div>
                <StyleNavbar hide={this.state.hide} fixedTop={showBackground}></StyleNavbar>
                {
                    (showBackground)
                    ? (
                        <header>
                            <div>
                                <div className="way-point" />
                                <Waypoint
                                    onEnter={this.showNavbar.bind(this, false)}
                                    onLeave={this.showNavbar.bind(this, true)}
                                    threshold={0}
                                />
                                <div className="intro-text">
                                    <div className="intro-lead-in">Welcome To Our Studio!</div>
                                    <div className="intro-heading">It's Nice To Meet You</div>
                                    <a href="#" className="page-scroll btn btn-xl">Tell Me More</a>
                                </div>
                            </div>
                        </header>

                    ) : (<div></div>)
                }
            </div>
        )
    }
}

Header.propTypes = {
    hide: React.PropTypes.bool
};