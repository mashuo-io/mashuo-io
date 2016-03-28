import axios from './server-request.service';
import {inject} from './injector';
import uuid from 'uuid';
import {displayBytes} from "./misc";
import {displayDuration} from "./misc";
import React from 'react';
import {ProgressBar} from 'react-bootstrap';

@inject(
	store=>({config: store.config})
)
export class FileUploader {
	constructor(file) {
		this.file = file;
	}

	upload = ({progress}) => {
		let {file, props: {config:{videoUploadUrl}}} = this;
		let key = `${uuid.v4()}.${getExtension(file.name)}`;

		return axios.get(`/qiniu-token/${key}`)
		.then(({data: {uptoken}}) => {

			let formData = new FormData();
			formData.append('key', key);
			formData.append('token', uptoken);
			formData.append('file', file);

			return axios.post(videoUploadUrl, formData, {progress})
		})
	}
}

export const getInitProgressState = file => ({
	percent: 0,
	total: file ? displayBytes(file.size) : '',
	loaded: 0,
	isUploading: !!file,
	file
});

export const progressStateChanged = (setWholeState, getState = (s=>s), buildState= (s=>s)) => ({loaded, total, timeStamp})=>{
	setWholeState((originalWholeState) =>{
		let {startedOn = timeStamp} = getState(originalWholeState);
		let percent = Math.floor(loaded / total * 100);

		return buildState({
			startedOn,
			percent,
			loaded: displayBytes(loaded),
			timeLeft: startedOn == timeStamp ? '未知' : displayDuration( (timeStamp - startedOn) / loaded * (total - loaded) / 1000)
		}, originalWholeState);
	});
};

export const Uploading = props => {
	console.log('uploading component', props);
	const {percent, isUploading, total, loaded, timeLeft} = props;
	return isUploading
		? <div>
				<ProgressBar	now={percent} label={`${percent}%`} />
				<span>{`${loaded} / ${total} ${timeLeft}`}</span>
			</div>
		: (props.uploadedUrl ? <a target="_blank" href={props.uploadedUrl}>查看</a> : <div></div>)
};

const getExtension = fileName => fileName.substr(fileName.lastIndexOf('.') + 1);
