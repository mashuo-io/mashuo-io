import React from 'react';
import {reduxForm, reset} from 'redux-form';
import {Input, ButtonToolbar} from 'amazeui-react';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';

let fields = ['name', 'description'];

let Form = reduxForm({
	form: 'video',
	fields
})(
	props => {
		const {
			fields: {name, description},
			handleSubmit,
			cancelForm,
			submitting
		} = props;
		return (
			<form className="am-form">
				<Input type="text" label="视频名称" placeholder="视频名称" {...name} />
				<Input type="textarea" label="视频描述" placeholder="视频描述" {...description} value={description.value || ''} />
				<ButtonToolbar>
					<Input type="submit" value="提交" amStyle="primary" onClick={handleSubmit} standalone />
					<Input type="reset" value="取消" amStyle="warning" onClick={cancelForm} standalone />
				</ButtonToolbar>
			</form>
		);
	}
);

Form = connect(
	null,
	dispatch=>{
		return {
			cancelForm: ()=>dispatch(goBack())
		}
	}
)(Form);

export default ()=>(
	<div>
		<h1>创建新视频</h1>
		<Form />
	</div>
)