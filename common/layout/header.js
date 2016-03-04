import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router';

export default class extends React.Component {
	render() {
		return <Menu mode="horizontal">
			<Menu.Item key="home">
				<Icon type="home" />主页
			</Menu.Item>
 			<Menu.Item key="auth">
			     <Link to="/auth"><Icon type="user" />登陆</Link>
			</Menu.Item>
		</Menu>
	}
}