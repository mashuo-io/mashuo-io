import React, {PropTypes} from 'react';
import {IconLinkGroup, IconLinkItem} from '../iconLink/IconLink';
import {Image, Glyphicon, Input, ButtonInput, Button} from 'react-bootstrap';
import {Like} from '../like/Like';
import {connect} from 'react-redux';
import {toggleReplyForm} from './comments.action';
import {getRefKey} from '../utils/misc';
import {CommentForm} from './CommentForm';
import {TimeAgo} from '../utils/TimeAgo';

@connect(
	(state, ownProps) => ({ replyFormOpened: (state.comments[getRefKey(ownProps)] || {}).active === ownProps._id }),
	(dispatch, ownProps) => ({ toggle: () => dispatch(toggleReplyForm(ownProps)) })
)
export class CommentItem extends React.Component {
	static propTypes = {
		avatarUrl: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		updatedOn: PropTypes.string.isRequired,
		_id: PropTypes.string.isRequired,
		refType: PropTypes.string.isRequired,
		refId: PropTypes.string.isRequired
	};

	render() {
		const {avatarUrl, author, text, _id, replyFormOpened, toggle, refType, refId, updatedOn} = this.props;

		return (
			<div className="comment-wrap">
				<div className="avatar">
					<Image src={avatarUrl} responsive circle />
				</div>

				<div className="comment-content">
					<IconLinkGroup>
						<IconLinkItem text={author} />
					</IconLinkGroup>


					<div className="comment-text">
						<p>{text}</p>
					</div>

					<IconLinkGroup>
						<IconLinkItem text={<TimeAgo date={updatedOn} />} />
						<IconLinkItem text="回复" icon={<Glyphicon glyph="send" />} onTextClick={toggle} />
						<Like refType="comment" refId={_id} />
					</IconLinkGroup>

					<CommentForm className="comment-reply"
						formKey={_id} onCancel={toggle} showCancelButton
						form={`comment-${getRefKey({refType, refId})}`}
						{...this.props}
					/>

				</div>
			</div>
		)
	}
}