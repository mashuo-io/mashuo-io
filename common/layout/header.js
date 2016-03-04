import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router';

export default class Header extends React.Component {
	render() {
		return <Menu mode="horizontal">
			<Menu.Item key="mail">
				<Icon type="mail" />导航一
			</Menu.Item>
 			<Menu.Item key="auth">
			    <Link to="/auth">登陆</Link>
			</Menu.Item>
		</Menu>
	}
}