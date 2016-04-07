import React, {PropTypes} from 'react';
import {CommentForm} from './CommentForm'
import {Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getRefKey} from '../utils/misc';

@connect(
	state=>({
		auth: state.auth,
		defaultAvatarUrl: state.config.defaultAvatarUrl
	})
)
export class CommentInput extends React.Component {
	static propTypes = {
		refType: PropTypes.string.isRequired,
		refId: PropTypes.string.isRequired,
		auth: PropTypes.object.isRequired,
		defaultAvatarUrl: PropTypes.string.isRequired
	};

	render() {
		let {auth, defaultAvatarUrl, refType, refId} = this.props;
		if (!auth.isLoggedIn) return (
			<div className="comment-wrap">
				请登录后再评论
			</div>
		);

		return (
			<div className="comment-wrap">
				<div className="avatar">
					<Image src={auth.avatarUrl || defaultAvatarUrl} responsive circle />
				</div>
				<CommentForm formKey="new" refType={refType} refId={refId} form={`comment-${getRefKey({refType, refId})}`} />
			</div>
		)
	}
}