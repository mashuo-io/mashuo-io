import React, {PropTypes} from 'react';
import {IconLinkItem} from '../iconLink/IconLink';
import {connect} from 'react-redux';
import {issueLike} from './likes.action';
import {Glyphicon} from 'react-bootstrap';

@connect(
	(state, {refType, refId})=>({
		doLike: state.myLikes[`${refType}/${refId}`],
		count: state.likes[`${refType}/${refId}`],
		isLoggedIn: state.auth.isLoggedIn
	}),
	(dispatch, {refType, refId})=>({
		issueLike: doLike=> dispatch(issueLike({refType, refId, doLike}))
	})
)
export class Like extends IconLinkItem {
	static defaultProps = {
		doLike: false,
		count: 0
	};
	static propTypes = {
		doLike: PropTypes.bool,
		refType: PropTypes.string.isRequired,
		refId: PropTypes.string.isRequired,
		count: PropTypes.number,
		className: PropTypes.string
	};

	render = ()=> {
		let {count, doLike, issueLike, isLoggedIn} = this.props;
		return (
			<IconLinkItem
				onIconClick = {isLoggedIn ? ()=> issueLike(!doLike) : undefined}
			    activeIcon={doLike} icon={<Glyphicon glyph="thumbs-up" />} text={count.toString()}
				{...this.props}
			/>
		);
	}
}