import React, { Component, PropTypes } from 'react';
import {connect} from "react-redux";
import {Button, Glyphicon, Image, SplitButton, MenuItem, Dropdown, NavItem} from 'react-bootstrap';
import {exchangeTokenByCode, logout,findTokenAndLogin, oauthReturn} from './auth.action';
import {LinkContainer} from 'react-router-bootstrap';

class NavImageDropdown extends React.Component {
    static propTypes = {
        noCaret: React.PropTypes.bool,
        img: React.PropTypes.node.isRequired,
        ...Dropdown.propTypes
    };

    render() {
        let { children, img, noCaret, title, ...props } = this.props;
        return (
            <Dropdown {...props} componentClass="li">
                <Dropdown.Toggle
                    useAnchor
                    disabled={props.disabled}
                    noCaret={noCaret}
                >
                    {title}&nbsp;&nbsp;
                    <button type="button" className="btn btn-default navbar-circle-avatar" ><Image src={img} responsive circle></Image></button>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {children}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

@connect(
    state =>({
        isLoggedIn: state.auth.isLoggedIn,
        email: state.auth.email,
        loginName: state.auth.loginName,
        avatarUrl: state.auth.avatarUrl
    }),
    dispatch=>({
        onExchangeTokenByCode: (code) => {dispatch(exchangeTokenByCode(code))},
        onLogout: () => {dispatch(logout())},
        onMount: () => {dispatch(findTokenAndLogin())},
        onOauthReturn: (data) => {dispatch(oauthReturn(data))}
    })
)
export default class AuthButton extends React.Component {
    componentDidMount(){
        this.props.onMount();
    }

    openLogin(){
        function encodeQueryData(data) {
            var ret = [];
            for (var d in data) {
                if (data.hasOwnProperty(d)) {
                    ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                }
            }

            return ret.join("&");
        }

        const loginUrl = "https://github.com/login/oauth/authorize?" + encodeQueryData({
                client_id: '34de227893b92e96f645',
                redirect_uri: 'http://127.0.0.1:8080/oauthback.html',
                response_type: 'code',
                scope: 'user:email'
            });

        window.open(loginUrl,'_blank','width=400,height=400,scrollbars=1');
    }


    render() {
        window.thisAuth = this;
        window.setResponse = function(res) {
            window.focus();

            if( window.thisAuth){
                window.thisAuth.props.onOauthReturn(res);
            }
        };

        return this.props.isLoggedIn
            ? (
                <NavImageDropdown eventKey={3} img={this.props.avatarUrl} title={this.props.loginName} id="basic-nav-dropdown">
                    <LinkContainer to="/my-courses">
                        <MenuItem eventKey={3.1}>我的视频</MenuItem>
                    </LinkContainer>
                    <LinkContainer to="/my-favorite/1">
                        <MenuItem eventKey={3.2}>我的收藏</MenuItem>
                    </LinkContainer>

                    <MenuItem divider />
                    <MenuItem eventKey={3.2} onClick={this.props.onLogout}>退出登录</MenuItem>
                </NavImageDropdown>
            )
            : (
                    <NavItem >
                        <Button bsStyle="success" bsSize="small" onClick={this.openLogin}>
                            <Glyphicon glyph="user" />&nbsp;通过Github登录
                        </Button>
                    </NavItem>
            )
    }
}