import uuid from 'uuid';

let uploader;

export const setUploader = (option) => {
	const { multi_selection, browse_button, fileAdded=()=>{},
		UploadProgress=()=>{}, FileUploaded=()=>{}, Error=()=>{}, BeforeUpload=()=>{}, UploadComplete=()=>{} } = option;

	const FilesAdded = fileAdded
		? (up, files) => {
			console.log('added', files);
			plupload.each(files, fileAdded)
		}
		: ()=>{};

	if (!uploader) {
		let option = {
			runtimes: 'html5,html4',
			browse_button,
			max_file_size: '1000mb',
			chunk_size: '4mb',
			uptoken_url: `http://localhost:3000/api/qiniu-token`,
			domain: '7xrmd3.com1.z0.glb.clouddn.com',
			get_new_uptoken: false,
			auto_start: true,
			log_level: 5,
			init: {
				FilesAdded,
				BeforeUpload,
				UploadProgress: (up, file)=>{
					UploadProgress(up, file)
				},
				UploadComplete,
				FileUploaded,
				Error,
				Key: (up, file) => `${uuid.v4()}.${Qiniu.getFileExtension(file.name)}`
			},
			multi_selection
		};
		return uploader = Qiniu.uploader(option);
	}

	if (multi_selection) uploader.setOption('multi_selection', multi_selection);
	if (browse_button) uploader.setOption('browse_button', browse_button);
	uploader.unbindAll();
	uploader.bind('FilesAdded', FilesAdded);
	uploader.bind('UploadProgress', UploadProgress);
	uploader.bind('FileUploaded', FileUploaded);
	uploader.bind('BeforeUpload', BeforeUpload);
	uploader.bind('UploadComplete', UploadComplete);
	uploader.refresh();
};