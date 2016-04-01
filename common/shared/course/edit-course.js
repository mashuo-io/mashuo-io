import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {ButtonGroup, Input,  Button, Col, Glyphicon, ButtonInput, Row, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {goBack} from 'react-router-redux';
import {doFetchOneMyCourse, doSaveMyCourse} from './course.action';
import {FileUploader, getInitProgressState, progressStateChanged, Uploading} from '../utils/qiniu-uploader';
import DropZone from 'react-dropzone';
import {WithContext as ReactTags} from 'react-tag-input';
import {Tags} from './tags';
import './edit-course.scss';


const video_filed = ['name', 'src', 'size', 'duration'];
export const fields = [
	'_id',
	'name',
	'description',
	'coverImageUrl',
	'tags'
].concat(video_filed.map(x=>`videos[].${x}`));

class Video extends React.Component {
	static propTypes = {
		index: PropTypes.number,
		fields: PropTypes.object,
		values: PropTypes.object,
		uploadingFile: PropTypes.object
	};

	constructor(props) {
		super();
		this.state = getInitProgressState(props.uploadingFile);
	}

	componentWillMount() {
		let {uploadingFile} = this.props;
		if (uploadingFile) 	this.upload(uploadingFile);
	}

	upload = (uploadingFile) => {
		let {src, duration} = this.props.fields;
		let uploader = new FileUploader(uploadingFile);
		uploader.upload({
			progress: progressStateChanged(::this.setState)
		})
		.then(({data})=>{
			src.onChange(data.src);
			duration.onChange(Math.round(parseFloat(data.duration)));
			this.setState({isUploading: false});
		});
	};

	shouldComponentUpdate({values: nextProps}, nextState) {
		const {values: oldProps} = this.props;
		let oldState = this.state;
		return oldProps.name !== nextProps.name
			||	oldProps.src !== nextProps.src
			||	oldProps.size !== nextProps.size
			||	oldState.percent !== nextState.percent
			||	oldProps.isUploading !== nextState.isUploading;
	}

	render() {
		const {
			index,
			fields: {name},
			values: {size, src}
			} = this.props;
		return (
			<Row >
				<Col sm={1}><span>#{index + 1}</span></Col>
				<Col sm={5}><Input type="text"  placeholder="说明" {...name}/></Col>
				<Col sm={4}><Uploading {...this.state} uploadedUrl={src} /></Col>
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
	{ form: 'course', fields },
	state=>({config: state.config}),
	dispatch=> ({
		cancelForm: () => dispatch(goBack()),
		onSubmit: (course) => dispatch(doSaveMyCourse(course)),
		fetchOne: (id) => dispatch(doFetchOneMyCourse(id))
	})
)
export default class extends React.Component {
	state = {files: {}, coverImageUploading: {}};

	componentWillMount() {
		if (this.props.params.id ) this.props.fetchOne(this.props.params.id);
	}

	upload(files) {
		const {fields: {videos}} = this.props;
		let initIndex = videos.length;
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
			videos.addField({
				index: n + initIndex,
				name: f.name,
				size: f.size
			});
		});
	}
	
	uploadCoverImage = (file)=> {
		this.setState({coverImageUploading: getInitProgressState(file)});
		let {fields: {coverImageUrl}} = this.props;
		let uploader = new FileUploader(file);
		uploader.upload({
			progress: progressStateChanged(
				::this.setState,
				state=>state.coverImageUploading,
				(state, wholeState)=>Object.assign({}, wholeState, {coverImageUploading:Object.assign({}, wholeState.coverImageUploading, state)}),
			)
		})
		.then(({data})=>{
			coverImageUrl.onChange(data.src);
			this.setState({ coverImageUploading: {isUploading: false}});
		});
	};

	render() {
		const {
			fields: {name, description, videos, tags: tagsField},
			values: {videos: videosValue, coverImageUrl, tags},
			handleSubmit,
			cancelForm,
			submitting,
			config
			} = this.props;
		const {coverImageUploading: {file: uploadingFile}} = this.state;
		return (
			<div className="container" id="edit-course">
				<h2>创建新课程</h2>
				<form className="am-form" onSubmit={handleSubmit}>
					<Input type="text" label="名称" placeholder="课程名称" {...name} />
					<Input type="textarea" label="描述" placeholder="课程描述" {...description} value={description.value || ''}/>

					<Input label="封面图片" wrapperClassName="wrapper">
						<img className="preview" src={uploadingFile ?  uploadingFile.preview : coverImageUrl} />
						<Uploading {...this.state.coverImageUploading} />
						<DropZone onDrop={files => ::this.uploadCoverImage(files[0])} className="drop-zone" activeClassName="active-drop-zone" >
							<div>请将需上传图片文件拖到此处,或者点击选择图片文件上传.</div>
						</DropZone>
					</Input>

					<Input label="相关技术" wrapperClassName="wrapper">
						<Tags tags={tags} />
						<ReactTags tags={tags}
						           suggestions= {config.courseTags}
						           handleDelete={i=>tagsField.onChange([...tags.slice(0, i), ...tags.slice(i + 1)])}
						           handleAddition={t=>tagsField.onChange([...tags, { id: tags.length + 1, text: t }])}
						           handleDrag={(tag, currentPos, newPos) => {
						                let temp = [...tags.slice(0, currentPos), ...tags.slice(currentPos + 1)];
						                tagsField.onChange([...tags.slice(0, newPos), tag, ...tags.slice(newPos)]);
						           }} />
					</Input>

					<Input label="视频" wrapperClassName="wrapper">
						{
							videos.length !== 0
								? videos.map((video, index) => (
									<Video key={index} uploadingFile={this.state.files[index]} index={index} fields={video} values={videosValue[index]} delete={index=>videos.removeField(index)}/>)
								)
								: <Row><Col>没有视频上传</Col></Row>
						}
						<Row key={Infinity}>
							<Col sm={12}>
								<DropZone onDrop={::this.upload} className="drop-zone" >
									<div>请将需上传视频文件拖到此处,或者点击选择视频文件上传.</div>
								</DropZone>
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