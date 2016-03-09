import React from 'react';
import {reduxForm, reset, change, addArrayValue} from 'redux-form';
import {ButtonGroup, ProgressBar, Input, ButtonToolbar, Button, Grid, Col, Glyphicon, ButtonInput, Row, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import {doFetchOneMyVideo, doSaveMyVideo} from './video.action';
import {setUploader} from '../utils/uploader';
import {displayBytes} from '../utils/misc';


const episode_filed = ['name', 'url', 'isUploading', 'uploadingProgress', 'size'];
export const fields = [
	'_id',
	'name',
	'description'
].concat(episode_filed.map(x=>`episodes[].${x}`));

class Episode extends React.Component {

	shouldComponentUpdate({values: next}) {
		const {values: old} = this.props;
		return old.uploadingProgress !== next.uploadingProgress
			|| old.name !== next.name
			||	old.url !== next.url
			||	old.isUploading !== next.isUploading
			||	old.size !== next.size
		;
	}

	render() {
		const {
			index,
			fields: {name},
			values: {isUploading, uploadingProgress, size, url}
			} = this.props;
		return (

			<Row >
				<Col sm={1}><span>#{index + 1}</span></Col>
				<Col sm={5}><Input type="text"  placeholder="说明" {...name}/></Col>
				<Col sm={4}>
					{
						isUploading
						? <div><ProgressBar
							now={uploadingProgress}
						    label={`共${displayBytes(size)} 还剩${uploadingProgress}%`}
						/><span>{`共${displayBytes(size)} 还剩${uploadingProgress}%`}</span>
						</div>
						: <a href={url}>查看</a>
					}
				</Col>
				<Col sm={2}>
					<ButtonGroup>
						<OverlayTrigger placement="top" overlay={ <Tooltip id={`del-${this.props.index}`}>删除</Tooltip>}>
							<Button href="javascript:"><Glyphicon glyph="trash" /></Button>
						</OverlayTrigger>
					</ButtonGroup>
				</Col>
			</Row>
		)
	}
}

@reduxForm(
	{ form: 'video', fields },
	null,
	dispatch=> ({
		cancelForm: () => dispatch(goBack()),
		onSubmit: (video) => dispatch(doSaveMyVideo(video)),
		fetchOne: (id) => dispatch(doFetchOneMyVideo(id)),
		changeEpisodeUploadingState: (file, isUploading) =>
			dispatch(change('video', `episodes[${file.index}].isUploading`, isUploading)),
		changeEpisodeUploadingProgress: (file) =>{
			console.log('dispatch progress', file);
			dispatch(change('video', `episodes[${file.index}].uploadingProgress`, file.percent))
		},
		changeEpisodeUrl: (file, url) => dispatch(change('video', `episodes[${file.index}].url`, url)),
		addNewEpisode: () => dispatch(addArrayValue())
	})
)

export default class Form extends React.Component {
	componentWillMount() {
		console.log('will mount', this.props);
		if (this.props.params.id ) this.props.fetchOne(this.props.params.id);
	}

	componentDidMount() {
		const {changeEpisodeUploadingProgress, changeEpisodeUrl, changeEpisodeUploadingState} = this.props;
		let self = this;
		setUploader({
			multi_selection: true,
			browse_button: `Upload`,
			FileUploaded: (up, file, info) => {
				info=JSON.parse(info);
				changeEpisodeUrl(file, info.key);
				changeEpisodeUploadingState(file, false);
			},
			UploadProgress: (up, file)=>changeEpisodeUploadingProgress(file),
			fileAdded: function (f){
				const { fields: {episodes} } = self.props;
				f.index = episodes.length;
				episodes.addField({
					name: f.name,
					size: f.size,
					uploadingProgress: 0,
					isUploading: true
				});
			}
		});
	}

	render() {
		const {
			fields: {name, description, episodes},
			values: {episodes: episodesValue},
			handleSubmit,
			cancelForm,
			submitting
			} = this.props;
		return (
			<div>
				<h2>创建新视频</h2>
				<form className="am-form" onSubmit={handleSubmit}>
					<Input type="text" label="名称" placeholder="视频名称" {...name} />
					<Input type="textarea" label="描述" placeholder="视频描述" {...description} value={description.value || ''}/>
					<Input label="内容" wrapperClassName="wrapper">
						{episodes.map((episode, index) => (
							<Episode key={index} index={index} fields={episode} values={episodesValue[index]} />
						))}
						<Row key={Infinity}>
							<Col sm={12}><Button  id="Upload">添加</Button></Col>
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