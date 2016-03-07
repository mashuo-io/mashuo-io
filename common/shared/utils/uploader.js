import uuid from 'uuid';

export const upload = (option) => {
	let noop = ()=>{};
	let { fileKey, chooseFileId, uploadComplete=noop, fileAdded=noop,
		beforeUpload=noop, uploadProgress=noop
		, fileUploaded=noop, error=noop } = option;

	let finalOption = {
		runtimes: 'html5,html4',
		browse_button: chooseFileId,
		max_file_size: '1000mb',
		chunk_size: '4mb',
		uptoken_url: `http://localhost:3000/api/qiniu-token`,
		domain: '7xrmd3.com1.z0.glb.clouddn.com',
		get_new_uptoken: false,
		auto_start: true,
		log_level: 5,
		init: {
			FilesAdded: (up, files) => {
				console.log('file added', up, files);
				plupload.each(files, file=>fileAdded(file));
			},
			BeforeUpload: (up, file) => beforeUpload(),
			UploadProgress: (up, file) => uploadProgress(file.percent),
			UploadComplete:() => uploadComplete(),
			FileUploaded: (up, file, info) => {
				fileUploaded(up, file, info);
				console.log('FileUploaded', up, file, info);
			},
			Error: (up, err, errTip) => error(),
			Key: (up, file) => `${uuid.v4()}.${Qiniu.getFileExtension(file.name)}`
		},
		multi_selection: false
	};

	return Qiniu.uploader(finalOption);
};