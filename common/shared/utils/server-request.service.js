/*
In order to allow use switch to different http library later in case, we create this adapter to easy it.
The adapter interface are same as axios:

Top apis:
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

Request config:
 {
	 // `url` is the server URL that will be used for the request
	 url: '/user',

	 // `method` is the request method to be used when making the request
	 method: 'get', // default

	 // `transformRequest` allows changes to the request data before it is sent to the server
	 // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
	 // The last function in the array must return a string or an ArrayBuffer
	 transformRequest: [function (data) {
	 // Do whatever you want to transform the data

	 return data;
	 }],

	 // `transformResponse` allows changes to the response data to be made before
	 // it is passed to then/catch
	 transformResponse: [function (data) {
	 // Do whatever you want to transform the data

	 return data;
	 }],

	 // `headers` are custom headers to be sent
	 headers: {'X-Requested-With': 'XMLHttpRequest'},

	 // `param` are the URL parameters to be sent with the request
	 params: {
	 ID: 12345
	 },

	 // `data` is the data to be sent as the request body
	 // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
	 // When no `transformRequest` is set, must be a string, an ArrayBuffer or a hash
	 data: {
	 firstName: 'Fred'
	 },

	 // `timeout` specifies the number of milliseconds before the request times out.
	 // If the request takes longer than `timeout`, the request will be aborted.
	 timeout: 1000,

	 // `withCredentials` indicates whether or not cross-site Access-Control requests
	 // should be made using credentials
	 withCredentials: false, // default

	 // `responseType` indicates the type of data that the server will respond with
	 // options are 'arraybuffer', 'blob', 'document', 'json', 'text'
	 responseType: 'json', // default

	 // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
	 xsrfCookieName: 'XSRF-TOKEN', // default

	 // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
	 xsrfHeaderName: 'X-XSRF-TOKEN' // default

	 // `progress` allows handling of progress events for 'POST' and 'PUT uploads'
	 // as well as 'GET' downloads
	 progress: function(progressEvent) {
	 // Do whatever you want with the native progress event
	 }
 }

 Response:
 {
	 // `data` is the response that was provided by the server
	 data: {},

	 // `status` is the HTTP status code from the server response
	 status: 200,

	 // `statusText` is the HTTP status message from the server response
	 statusText: 'OK',

	 // `headers` the headers that the server responded with
	 headers: {},

	 // `config` is the config that was provided to `axios` for the request
	 config: {}
 }
 */

import axios from 'axios';
import {push} from 'react-router-redux';
import {inject} from './injector';

let appConfig = {};
inject(state=>({baseUrl: state.config.baseUrl, clientId: state.auth.clientId}))(appConfig);
axios.interceptors.request.use(
	config => {
		let isAbsoluteURLRegex = /^(?:\w+:)\/\//;
		if ( !isAbsoluteURLRegex.test(config.url) ) {
			config.url = `${appConfig.props.baseUrl}${config.url}`;
		}

		if (/.json$/.test(config.url) || /.html$/.test(config.url)) return config;

		config.headers['Authorization'] = `Bearer ${localStorage.getItem('Token')} ${appConfig.props.clientId}`;

		return config;
	},
	error => Promise.reject(error)
);

axios.interceptors.response.use(
	response => response,
	error => {
		switch(error.status)
		{
			case 401:
			case 403:
				push('/auth');
				break;
		}

		return Promise.reject(error);
	}
);

export default axios;



