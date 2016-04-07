import React, {PropTypes} from 'react';
import TextAreaAutosize from 'react-textarea-autosize';
import {ButtonInput, Image} from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import {addComment} from './comments.action';

export const fields = ['comment', 'replyId'];

@reduxForm(
	{fields},
	(state, ownProps)=>({
		auth: state.auth,
		defaultAvatarUrl: state.config.defaultAvatarUrl,
		initialValues: {replyId: ownProps._id }
	})
)
export class CommentForm extends React.Component {
	static defaultProps = {
		showCancelButton: false,
		replyFormOpened: true
	};
	static propTypes = {
		form: PropTypes.string,
		showCancelButton: PropTypes.bool,
		onSubmit: PropTypes.func,
		onCancel: PropTypes.func,
		handleSubmit: PropTypes.func,
		replyFormOpened: PropTypes.bool,
		className: PropTypes.string
	};

	submit = ({comment, replyId}, dispatch) => {
		const {refType, refId, fields: {comment:commentField}} = this.props;
		dispatch(addComment({refType, refId, comment, replyId}, ()=>commentField.onChange('')));
	};

	render() {
		const {auth, onCancel, showCancelButton, fields: {comment}, handleSubmit, onSubmit, replyFormOpened, defaultAvatarUrl, className} = this.props;
		if (!auth.isLoggedIn) return (
			<div className={`${className} ${replyFormOpened ? '' : 'hide'}`}>
				请登录后再评论
			</div>
		);

		return (
			<div className={`${className} ${replyFormOpened ? '' : 'hide'}`}>
				<div className="avatar">
					<Image src={auth.avatarUrl || defaultAvatarUrl} responsive circle />
				</div>

				<form className="comment-content"  onSubmit={handleSubmit(this.submit)}>
					<div className="form-group">
						<TextAreaAutosize className="form-control" placeholder="我来说两句..." {...comment} />
					</div>
					<ButtonInput bsStyle="primary" type="submit" value="提交" className="pull-right" />
					{
						showCancelButton
						? <ButtonInput bsStyle="default" type="reset" value="取消" className="pull-right" onClick={()=>{onCancel(); comment.onChange('');}}/>
						: null
					}
				</form>
			</div>
		)
	}
}