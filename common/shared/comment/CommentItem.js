import React from 'react';
import {} from './CommentForm';
import {IconLinkGroup, IconLinkItem} from '../iconLink/IconLink';
import {Image, Glyphicon, Input, ButtonInput, Button} from 'react-bootstrap';
import {timeAgo} from '../utils/misc';


export class CommentItem extends React.Component {
	static propTypes = {
		avatarUrl: React.PropTypes.string,
		text: React.PropTypes.string,
		author: React.PropTypes.string,
		updatedOn: React.PropTypes.instanceOf(Date)
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
		this.interval = setInterval(() => this.setState({timeAgo: timeAgo(updatedOn)}), 1000* 60);
	};
	componentWillUnmount = () => clearInterval(this.interval);

	render() {
		const {avatarUrl, author, text, when} = this.props;

		let ReplyElement = null;

		if (this.state.openReplyForm) {
			ReplyElement = (
				<div className="comment-reply">
					<div className="avatar">
						<Image src={avatarUrl} responsive circle></Image>
					</div>

					<CommentForm showCancelButton onCancel={this.onCancelReply}/>
				</div>
			)
		}

		return (
			<div className="comment-wrap">
				<div className="avatar">
					<Image src={avatarUrl} responsive circle></Image>
				</div>

				<div className="comment-content">
					<IconLinkGroup>
						<IconLinkItem text={author}></IconLinkItem>
					</IconLinkGroup>


					<div className="comment-text">
						<p>{text}</p>
					</div>

					<IconLinkGroup>
						<IconLinkItem text={this.state.timeAgo}></IconLinkItem>
						<IconLinkItem text="回复" icon={<Glyphicon glyph="send" />}
						              onTextClick={this.onReply}></IconLinkItem>
						<IconLinkItem text="赞" icon={<Glyphicon glyph="heart" />}></IconLinkItem>
					</IconLinkGroup>

					{ReplyElement}

				</div>
			</div>
		)
	}
}
