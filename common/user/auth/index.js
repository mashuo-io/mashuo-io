import React, { Component, PropTypes } from 'react';
import {Button, Icon}  from "antd";
import {connect} from "react-redux";
import {startOauthGithubLogin, doOauthGithubLogin} from './auth.action';

const Auth = React.createClass({
    render: function() {
        return (
            <Button type="primary" size="large" onClick={this.props.onLogin} loading={this.props.isFetching}>
                <Icon type="github" />
                通过Github登录
            </Button>
        )
    }
});

const stateToProps = function(state) {
    console.log(state.auth);
    return {
        isFetching: state.auth.isFetching
    }
};

const dispatchToProps = function(dispatch) {
    // In a real app, you would 'dispatch' an action here based
    // on the user being clicked
    return {
        onLogin: () => {dispatch(startOauthGithubLogin()); dispatch(doOauthGithubLogin())}
    }
};

export default connect(stateToProps, dispatchToProps)(Auth)
