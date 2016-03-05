import React, { Component, PropTypes } from 'react';
import {Button, Icon}  from "amazeui-react";
import {connect} from "react-redux";
import {startOauthGithubLogin, doOauthGithubLogin, popoutGithubLogin, closeGithubLogin} from './auth.action';

class Auth extends React.Component {
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

        window.setSearchResult = function(returnValue){
            console.log('child closed', returnValue);
            window.focus();
        };

        window.open(loginUrl,'_blank','width=400,height=400,scrollbars=1');
    }


    render() {
        return (
            <Button type="primary" size="large" onClick={this.openLogin}>
                <Icon icon="github"/>
                通过Github登录
            </Button>
        )
    }
}

const stateToProps = function(state) {
    return {
        isFetching: state.auth.isFetching,
        isPoppedOut: state.auth.isPoppedOut
    }
};

const dispatchToProps = function(dispatch) {
    return {
        onLogin: () => {dispatch(doOauthGithubLogin())},
        onPopoutGithubLogin: (url) => {dispatch(popoutGithubLogin(url))},
        onCloseGithubLogin: () => {dispatch(closeGithubLogin())}
    }
};

export default connect(stateToProps, dispatchToProps)(Auth)
