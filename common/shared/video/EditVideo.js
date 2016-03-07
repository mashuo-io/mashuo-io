import React from 'react';
import {reduxForm, reset} from 'redux-form';
import {Input, ButtonToolbar, Button, Grid, Col, Glyphicon, ButtonInput, Row, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import {doFetchOneMyVideo, doSaveMyVideo} from './video.action';
import {upload} from '../utils/uploader';

export const fields = [
	'_id',
	'name',
	'description',
	'episodes[].name',
	'episodes[].url'
];

class Episode extends React.Component {
	componentDidMount() {
		console.log('pppppp', this.props);
		upload({
			fileKey: '6.png',
			chooseFileId: `e${this.props.index}`,
			uploadComplete: ()=>console.log('upload complete', arguments),
			uploadProgress: (percent)=>console.log(percent)
		});
	}

	render() {
		return (
			<Row >
				<Col sm={1}><span>#{this.props.index + 1}</span></Col>
				<Col sm={5}><Input type="text"  placeholder="说明" field={this.props.episode.name}/></Col>
				<Col sm={5}>
					<Input id={`e${this.props.index}`} type="file" placeholder="Url" field={this.props.episode.url} />
				</Col>
				<Col sm={1}>
					<OverlayTrigger placement="left" overlay={ <Tooltip id={`del-${this.props.index}`}>删除</Tooltip>}>
						<a href="javascript:"><Glyphicon glyph="trash" /></a>
					</OverlayTrigger>
				</Col>
			</Row>
		)
	}
}

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
				<h2>创建新视频</h2>
				<form className="am-form" onSubmit={handleSubmit}>
					<Input type="text" label="视频名称" placeholder="视频名称" {...name} />
					<Input type="textarea" label="视频描述" placeholder="视频描述" {...description} value={description.value || ''}/>
					<Input label="内容" wrapperClassName="wrapper">
						{episodes.map((episode, index) => (
							<Episode key={index} index={index} episode={episode} />
						))}
						<Row key={Infinity}>
							<Col sm={12}><Button onClick={()=>episodes.addField()}>添加一集</Button></Col>
						</Row>
					</Input>

					<Input wrapperClassName="wrapper">
						<Row>
							<Col xs={1}> <ButtonInput bsStyle="primary" type="submit" value="提交" /></Col>
							<Col xs={1}> <ButtonInput bsStyle="warning" type="reset" value="取消" onClick={cancelForm} /></Col>
						</Row>
					</Input>
				</form>
			</div>
		);
	}
}