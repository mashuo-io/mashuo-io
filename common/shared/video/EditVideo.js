import React from 'react';
import {reduxForm, reset} from 'redux-form';
import {Input, ButtonToolbar} from 'amazeui-react';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import {doFetchOneMyVideo, doSaveMyVideo} from './video.action';

export const fields = ['_id', 'name', 'description'];

@reduxForm(
	{ form: 'video', fields },
	null,
	dispatch=> {
		return {
			cancelForm: () => dispatch(goBack()),
			onSubmit: (video) => dispatch(doSaveMyVideo(video)),
			fetchOne: (id) => dispatch(doFetchOneMyVideo(id))
		}
	}
)
export default class Form extends React.Component {
	componentWillMount() {
		console.log('will mount', this.props);
		if (this.props.params.id ) this.props.fetchOne(this.props.params.id);
	}
	render() {
		const {
			fields: {name, description},
			handleSubmit,
			cancelForm,
			submitting
			} = this.props;
		console.log('fdsafdsa', this.props);
		return (
			<div>
				<h1>创建新视频</h1>
				<form className="am-form" onSubmit={handleSubmit}>
					<Input type="text" label="视频名称" placeholder="视频名称" {...name} />
					<Input type="textarea" label="视频描述" placeholder="视频描述" {...description} value={description.value || ''}/>
					<ButtonToolbar>
						<Input type="submit" value="提交" amStyle="primary" standalone/>
						<Input type="reset" value="取消" amStyle="warning" onClick={cancelForm} standalone/>
					</ButtonToolbar>
				</form>
			</div>
		);
	}
}