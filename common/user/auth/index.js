import React, { Component, PropTypes } from 'react';
import {Button, Icon}  from "react-bootstrap";
import {connect} from "react-redux";
import {exchangeTokenByCode, logout} from './auth.action';

class Auth extends React.Component {
    constructor(props){
        super(props);
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

        window.setSearchResult = function(code){
            window.focus();

            if( window.thisAuth){
                window.thisAuth.props.onExchangeTokenByCode(code);
            }
        };

        window.open(loginUrl,'_blank','width=400,height=400,scrollbars=1');
    }


    render() {
        window.thisAuth = this;
        if ( this.props.isLoggedIn ){
            return (
                <Button type="primary" size="large" onClick={this.props.onLogout}>
                    <Icon icon="github"/>
                    注销
                </Button>
            )
        }else {
            return (
                <Button type="primary" size="large" onClick={this.openLogin}>
                    <Icon icon="github"/>
                    通过Github登录
                </Button>
            )
        }

    }
}

const stateToProps = function(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
};

const dispatchToProps = function(dispatch) {
    return {
        onExchangeTokenByCode: (code) => {dispatch(exchangeTokenByCode(code))},
        onLogout: () => {dispatch(logout())}
    }
};

export default connect(stateToProps, dispatchToProps)(Auth)
