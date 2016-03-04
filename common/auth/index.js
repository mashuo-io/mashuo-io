import React, { Component, PropTypes } from 'react';
import {Button, Icon}  from "antd";

//const text = Array.from(Array(100).keys());

console.log(text);
export default class Auth extends Component {
    render() {
        return (
            <Button type="primary" size="large">
                <Icon type="github" />
                通过Github登录
            </Button>
            //<ul>
            //{
            //    text.map((i)=>{
            //        return <li key={i}>hello {i}</li>;
            //    })
            //}
            //</ul>
        )
    }
}