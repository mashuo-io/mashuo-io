import React from 'react';
import {connect} from 'react-redux'
import {doFetchOneVideo} from './video.action';
import {Row, Col} from 'react-bootstrap';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import videojs from 'video.js';

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
	}


	componentWillMount() {
		this.setState({
			playerHeight: 0
		});
	}

	resize() {
		this.setState({playerHeight: this.refs.player.getDOMNode().offsetHeight});
	}

	componentDidMount() {
		this.resize();
		ResizeSensor(this.refs.player.getDOMNode(), this.resize.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resize.bind(this));
	}

	render () {
		const {status, video} = this.props.video;

		console.log('rendering', this.state);
		let {name} = video ||{};
		return (
			<div id="video">
			<div className="video-row" fluid>
				<div className="player-col" ref="player" >
					<div className="player-wrapper" >
						{<video id="my-video" className="video-js video-player  vjs-default-skin vjs-big-play-centered" controls >
							<source src="http://7xrmd3.com1.z0.glb.clouddn.com/9f1f7b15-266f-4b4f-9536-99b76c85e7e8.mp4" type='video/mp4' />
							<p className="vjs-no-js">
								To view this video please enable JavaScript, and consider upgrading to a web browser that
								<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
							</p>
						</video>}
					</div>
				</div>
				<div className="playlist-col" style={{height: this.state.playerHeight}}>
					<div className="auto-play"></div>
					<div className="video-name"></div>
					<div className="episodes"></div>
				</div>
			</div>
			</div>
		)
	}
};