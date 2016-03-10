import React from 'react';
import {connect} from 'react-redux'
import {doFetchOneVideo} from './video.action';
import {Row, Col} from 'react-bootstrap';


import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import playlist from 'videojs-playlist';
import 'videojs-playlist-ui/dist/videojs-playlist-ui'
import 'videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css'

@connect(
	state=>({video: state.publicVideo}),
	dispatch => ({
		doFetch: id => dispatch(doFetchOneVideo(id))
	})
)
export default class extends React.Component {

	componentWillMount() {
		this.props.doFetch(this.props.params.id);
	}

	componentDidMount() {
		var player = videojs('my-video', {
			controls: true,
			autoplay: false,
			preload: 'auto',
			controlBar: {
				muteToggle: true
			}
		});
		player.playlist([
			{sources: [{src: "http://7xrmd3.com1.z0.glb.clouddn.com/9f1f7b15-266f-4b4f-9536-99b76c85e7e8.mp4", type: 'video/mp4'}]},
			{sources: [{src: "http://7xrmd3.com1.z0.glb.clouddn.com/c747e593-e54a-4201-bfc5-6f7cb1780594.mp4", type: 'video/mp4'}]},
			{sources: [{src: "http://7xrmd3.com1.z0.glb.clouddn.com/d0a1fc04-08fd-4764-9e61-dc18c6e0f910.mp4", type: 'video/mp4'}]}
		]);
		player.playlistUi();
	}

	render () {
		const {status, video} = this.props.video;


		let {name} = video ||{};


		return (
			<div className="container">
			<Row >
				<Col xs={9}  >
					<video id="my-video" className="video-js  vjs-default-skin vjs-big-play-centered" controls preload="auto" width="100%" >
						<p className="vjs-no-js">
							To view this video please enable JavaScript, and consider upgrading to a web browser that
							<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
						</p>
					</video>
				</Col>

				<Col xs={3} style={{backgroundColor:'yellow'}}>
					fdsafds
				</Col>
			</Row>
			</div>
		)
	}
};