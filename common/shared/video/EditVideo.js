import React, {PropTypes} from 'react';
import {reduxForm, reset, change, addArrayValue} from 'redux-form';
import {ButtonGroup, ProgressBar, Input, ButtonToolbar, Button, Grid, Col, Glyphicon, ButtonInput, Row, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {connect} from 'react-redux';
import {goBack} from 'react-router-redux';
import {doFetchOneMyVideo, doSaveMyVideo} from './video.action';
import {displayBytes, displayDuration} from '../utils/misc';
import {FileUploader} from '../utils/qiniu-uploader';


const episode_filed = ['name', 'url', 'size'];
export const fields = [
	'_id',
	'name',
	'description'
].concat(episode_filed.map(x=>`episodes[].${x}`));

@connect(null,
	dispatch=>({
		changeEpisodeUrl: (index, url) => dispatch(change('video', `episodes[${index}].url`, url))
	})
)
class Episode extends React.Component {
	static propTypes = {
		index: PropTypes.number,
		fields: PropTypes.object,
		values: PropTypes.object,
		uploadingFile: PropTypes.object
	};

	constructor(props) {
		super();
		let {uploadingFile} = props;
		this.state = {
			percent: 0,
			total: uploadingFile ? displayBytes(uploadingFile.size) : '',
			loaded: 0,
			isUploading: !!uploadingFile
		};
		if (uploadingFile) 	this.upload(uploadingFile);
	}

	upload = (uploadingFile) => {
		let uploader = new FileUploader(uploadingFile);
		uploader.upload({
			progress: ({loaded, total, timeStamp})=>{
				let {startedOn = timeStamp} = this.state;
				let percent = Math.floor(loaded / total * 100);
				this.setState({
					startedOn,
					percent,
					loaded: displayBytes(loaded),
					timeLeft: startedOn == timeStamp ? '未知' : displayDuration( (timeStamp - startedOn) / loaded * (total - loaded) / 1000)
				})
			}
		})
		.then(({data})=>{
			this.props.changeEpisodeUrl(this.props.index, data.key);
			this.setState({isUploading: false});
		});
	};

	shouldComponentUpdate({values: nextProps}, nextState) {
		const {values: oldProps} = this.props;
		let oldState = this.state;
		return oldProps.name !== nextProps.name
			||	oldProps.url !== nextProps.url
			||	oldProps.size !== nextProps.size
			||	oldState.percent !== nextState.percent
			||	oldProps.isUploading !== nextState.isUploading;
	}

	render() {
		const {
			index,
			fields: {name},
			values: {size, url}
			} = this.props;
		const {percent, isUploading, total, loaded, timeLeft} = this.state;
		return (
			<Row >
				<Col sm={1}><span>#{index + 1}</span></Col>
				<Col sm={5}><Input type="text"  placeholder="说明" {...name}/></Col>
				<Col sm={4}>
					{
						isUploading
							? <div><ProgressBar
							now={percent}
							label={`${percent}%`}
						/><span>{`${loaded} / ${total} ${timeLeft}`}</span>
						</div>
							: <a href={url}>查看</a>
					}
				</Col>
				<Col sm={2}>
					<ButtonGroup>
						<OverlayTrigger placement="top" overlay={ <Tooltip id={`del-${this.props.index}`}>删除</Tooltip>}>
							<Button href="javascript:" onClick={()=>this.props.delete(index)}><Glyphicon glyph="trash" /></Button>
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
		fetchOne: (id) => dispatch(doFetchOneMyVideo(id))
	})
)
export default class Form extends React.Component {
	state = {files: {}};

	componentWillMount() {
		if (this.props.params.id ) this.props.fetchOne(this.props.params.id);
	}

	upload(files) {
		const {fields: {episodes}} = this.props;
		let initIndex = episodes.length;
		files = Array.from(files);
		this.setState(
			{
				files: Object.assign({}, this.state.files, files.reduce((ret, value, i) => {
					ret[initIndex+i] = value;
					return ret;
					}, {}))
			}
		);
		files.map((f, n)=>{
			console.log('adding', n + initIndex, f.name, f.size, this.state.files, f);
			episodes.addField({
				index: n + initIndex,
				name: f.name,
				size: f.size
			});
		});
	}

	render() {
		console.log('rending', this.state);
		const {
			fields: {name, description, episodes},
			values: {episodes: episodesValue},
			handleSubmit,
			cancelForm,
			submitting
			} = this.props;
		return (
			<div className="container">
				<h2>创建新视频</h2>
				<form className="am-form" onSubmit={handleSubmit}>
					<Input type="text" label="名称" placeholder="视频名称" {...name} />
					<Input type="textarea" label="描述" placeholder="视频描述" {...description} value={description.value || ''}/>
					<Input label="视频" wrapperClassName="wrapper">
						{
							episodes.length !== 0
								? episodes.map((episode, index) => (
									<Episode key={index} uploadingFile={this.state.files[index]} index={index} fields={episode} values={episodesValue[index]} delete={index=>episodes.removeField(index)}/>)
								)
								: <Row><Col>没有视频上传</Col></Row>
						}
						<Row key={Infinity}>
							<Col sm={12}>
								<Input type="file" multiple help="上传视频" onChange={e=>this.upload(e.target.files)} />
							</Col>
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