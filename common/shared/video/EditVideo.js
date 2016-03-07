import React from 'react';
import {reduxForm, reset} from 'redux-form';
import {Input, ButtonToolbar, Button, Grid, Col, FormGroup, Icon} from 'amazeui-react';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import {doFetchOneMyVideo, doSaveMyVideo} from './video.action';

export const fields = [
	'_id',
	'name',
	'description',
	'episodes[].name',
	'episodes[].url'
];

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
			fields: {name, description, episodes},
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
					<FormGroup>
						<h4>视频</h4>
						{episodes.map((episode, index) => (
							<Grid key={index}>
								<Col sm={1}><span>#{index + 1}</span></Col>
								<Col sm={5}><Input type="text"  placeholder="说明" field={episode.name}/></Col>
								<Col sm={5}>
									<Input type="file" placeholder="Url" field={episode.url} />
								</Col>
								<Col sm={1}>
									<a><Icon button icon="trash" /></a>
								</Col>
							</Grid>
						))}
						<Grid>
							<Col sm={12}><Button onClick={()=>episodes.addField()}>添加一集</Button></Col>
						</Grid>
					</FormGroup>
					<ButtonToolbar>
						<Input type="submit" value="提交" amStyle="primary" standalone/>
						<Input type="reset" value="取消" amStyle="warning" onClick={cancelForm} standalone/>
					</ButtonToolbar>
				</form>
			</div>
		);
	}
}