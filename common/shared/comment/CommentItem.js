import React from 'react';
import {IconLinkGroup, IconLinkItem} from '../iconLink/IconLink';
import {Image, Glyphicon, Input, ButtonInput, Button} from 'react-bootstrap';
import {timeAgo} from '../utils/misc';
import {Like} from '../like/Like';

export class CommentItem extends React.Component {
	static propTypes = {
		avatarUrl: React.PropTypes.string,
		text: React.PropTypes.string,
		author: React.PropTypes.string,
		updatedOn: React.PropTypes.string,
		_id: React.PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			openReplyForm: false
		}
	}

	onReply = () => {
		if (this.state.openReplyForm) {
			return;
		}

		this.setState({openReplyForm: true});
		if (this.props.notifyClickReply) {
			this.props.notifyClickReply(this);
		}
	};

	onCancelReply = () => {
		this.setState({openReplyForm: false});
		if (this.props.notifyClickReply) {
			this.props.notifyClickReply(this);
		}

	};

	componentWillMount = () => {
		let {updatedOn} = this.props;
		const func = () =>this.setState({timeAgo: timeAgo(updatedOn)});
		this.interval = setInterval(func, 1000* 60);
		func();
	};
	componentWillUnmount = () => clearInterval(this.interval);

	render() {
		const {avatarUrl, author, text, when, _id} = this.props;

		let ReplyElement = null;

		if (this.state.openReplyForm) {
			ReplyElement = (
				<div className="comment-reply">
					<div className="avatar">
						<Image src={avatarUrl} responsive circle />
					</div>

					<CommentForm showCancelButton onCancel={this.onCancelReply}/>
				</div>
			)
		}

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
						<IconLinkItem text={this.state.timeAgo} />
						<IconLinkItem text="回复" icon={<Glyphicon glyph="send" />} onTextClick={this.onReply} />
						<Like refType="comment" refId={_id} />
					</IconLinkGroup>

					{ReplyElement}

				</div>
			</div>
		)
	}
}
