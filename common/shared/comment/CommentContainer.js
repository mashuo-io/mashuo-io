import React, {PropTypes} from 'react';
import {CommentItem, CommentInput} from './index';
import {connect} from 'react-redux';
import {getRefKey} from '../utils/misc';
import {loadComments} from './comments.action';

@connect(
	(state, ownProps) => ({
		comments: state.comments[getRefKey(ownProps)]
	}),
	(dispatch, ownProps) => ({
		load: ()=>dispatch(loadComments(ownProps))
	})
)
export class CommentContainer extends React.Component {
	static propTypes = {
		refType: PropTypes.string,
		refId: PropTypes.string,
		comments: PropTypes.array,
		load: PropTypes.func
	};

	onHandleCommentItemReplyClicked(child) {
		let commentFormWillOpen = !child.state.openReplyForm;      // At this point, the open state is not updated yet. Which means if current open is false, it will be opened

		if (commentFormWillOpen) {
			if (this.commentFormOpendItem) {
				this.commentFormOpendItem.setState({openReplyForm: !this.commentFormOpendItem.state.openReplyForm});
			}
			this.commentFormOpendItem = child;
		}
		else {
			this.commentFormOpendItem = null;
		}
	}


	getComments = () => {
		let {comments, load} = this.props;
		if (!comments) load();
	};

	componentWillMount = () => this.getComments();

	componentWillReceiveProps({refType: nextRefType, refId: nextRefId}) {
		let {refType, refId} = this.props;
		if (refType != nextRefType || refId != nextRefId) this.getComments();
	}

	render() {
		const parent = this;

		const children = React.Children.map(this.props.children, function (c, index) {
			if (c.type === CommentItem) {
				return React.cloneElement(c, {
					notifyClickReply: parent.onHandleCommentItemReplyClicked.bind(parent)
				});
			}
			else {
				return c;
			}
		});

		let {comments=[], refType, refId} = this.props;
		let refKey = getRefKey({refType, refId});
		return (
			<div>
				<CommentInput refType = {refType} refId = {refId} />
				{comments.map(c=><CommentItem
					key={c._id}
					avatarUrl={c.avatarUrl}
					author={c.author}
					text={c.comment}
					updatedOn={c.updatedOn}
				    refType = {refType}
				    refId = {refId}
				    _id = {c._id}
				/>)}
			</div>
		)
	}
}