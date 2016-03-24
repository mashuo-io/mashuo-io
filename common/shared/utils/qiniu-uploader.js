import axios from './server-request.service';
import {inject} from './injector';
import uuid from 'uuid';

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

		return axios.get(`/qiniu-token`,{params:{key}})
		.then(({data: {uptoken}}) => {

			let formData = new FormData();
			formData.append('key', key);
			formData.append('token', uptoken);
			formData.append('file', file);

			return axios.post(videoUploadUrl, formData, {progress})
		})
	}
}

const getExtension = fileName => fileName.substr(fileName.lastIndexOf('.') + 1);
