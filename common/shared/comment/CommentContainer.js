import React, {PropTypes} from 'react';
import {CommentItem, CommentForm} from './index';
import {connect} from 'react-redux';
import {getRefKey} from '../utils/misc';
import {loadComments} from './comments.action';

@connect(
	(state, ownProps) => ({
		comments: (state.comments[getRefKey(ownProps)] || {}).comments
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
		let {comments=[], refType, refId} = this.props;
		let refKey = getRefKey({refType, refId});
		return (
			<div >
				<CommentForm className="comment-wrap"
					formKey="new" form={`comment-${refKey}`}
					{...this.props}
				/>
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