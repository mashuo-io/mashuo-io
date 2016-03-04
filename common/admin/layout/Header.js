import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router';

export default class extends React.Component {
	render() {
		return <Menu mode="horizontal">

			<Menu.Item key="home">
				<Link to="/admin"><Icon type="home" />主页</Link>
			</Menu.Item>

			<Menu.Item key="video">
				<Link to="/admin/video"><Icon type="video-camera" />视频</Link>
			</Menu.Item>

			<Menu.Item key="user">
				<Link to="/admin/user"><Icon type="user" />用户</Link>
			</Menu.Item>

			<Menu.Item key="auth">
				<Link to="/auth"><Icon type="logout" />登陆</Link>
			</Menu.Item>

		</Menu>
	}
}