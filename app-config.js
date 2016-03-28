(function (global) {
	var baseDownloadUrl = 'http://7xrmd3.com1.z0.glb.clouddn.com';
	global.appConfig = {
		baseUrl: 'http://localhost:3000/api',
		videoUploadUrl: 'http://upload.qiniu.com',
		videoDownloadUrl: baseDownloadUrl,
		courseTagUrl: baseDownloadUrl + '/course-tags',
		courseTags: ['javascript', 'webpack']
	}
})(window);
