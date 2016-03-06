import React from 'react';
import {Link} from 'react-router';
import {Topbar, Nav, CollapsibleNav, Icon} from 'amazeui-react';
import ActiveNavItem from '../../shared/utils/ActiveNavItem';

class Header extends React.Component {
	render() {
		return (
			<Topbar brand="码说" toggleNavKey="nav">
				<CollapsibleNav eventKey="nav">
					<Nav topbar>
						<ActiveNavItem activeClassName="am-active" onlyActiveOnIndex  to="/">主页</ActiveNavItem>
						<ActiveNavItem activeClassName="am-active" to="/video">视频</ActiveNavItem>
						<ActiveNavItem activeClassName="am-active" to="/my-video">我的视频</ActiveNavItem>
						<ActiveNavItem activeClassName="am-active" to="/auth">登陆</ActiveNavItem>
					</Nav>
				</CollapsibleNav>
			</Topbar>
		);
	}
}

export default Header;