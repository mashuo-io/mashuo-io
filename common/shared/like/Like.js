import React, {PropTypes} from 'react';
import {IconLinkItem} from '../iconLink/IconLink';
import {connect} from 'react-redux';
import {myLikeChanged} from '../../user/profile/my-likes.action';
import {Glyphicon} from 'react-bootstrap';

@connect(
	(state, {refType, refId})=>({doLike: state.myLikes[`${refType}/${refId}`]}),
	(dispatch, {refType, refId})=>({
		changeLike: doLike=>dispatch(myLikeChanged({refType, refId, doLike}))
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
		let {count, doLike, changeLike} = this.props;
		return (<IconLinkItem {...this.props} onIconClick = {()=>changeLike(!doLike)}  activeIcon={doLike} icon={<Glyphicon glyph="thumbs-up" />} text={count.toString()}/>);
	}
}