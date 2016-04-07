import React, {PropTypes} from 'react';
import TextAreaAutosize from 'react-textarea-autosize';
import {ButtonInput} from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import {addComment} from './comments.action';

export const fields = ['comment'];

@reduxForm(
	{fields},
	null,
	(dispatch, {refType, refId}) => ({
		onSubmit: ({comment}) => dispatch(addComment({refType, refId, comment}))
	})
)
export class CommentForm extends React.Component {
	static propTypes = {
		form: PropTypes.string,
		showCancelButton: PropTypes.bool,
		onSubmit: PropTypes.func,
		onCancel: PropTypes.func,
		handleSubmit: PropTypes.func
	};

	render() {
		const {showCancelButton, onSubmit, onCancel} = this.props;
		let CancelButton = null;

		if (showCancelButton) {
			CancelButton = (
				<ButtonInput bsStyle="default" type="reset" value="取消" className="pull-right" onClick={onCancel}/>
			)
		}

		let {fields: {comment}, handleSubmit} = this.props;

		return (
			<form className="comment-content"  onSubmit={handleSubmit}>
				<div className="form-group">
					<TextAreaAutosize className="form-control" placeholder="我来说两句..." {...comment} />
				</div>
				<ButtonInput bsStyle="primary" type="submit" value="提交" className="pull-right" />
				{CancelButton}
			</form>
		)
	}
}