import React from 'react';
import {connect} from 'react-redux'
import {doFetchOneCourse} from './course.action';
import {Row, Col} from 'react-bootstrap';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import videojs from 'video.js';
import "./course.scss";

@connect(
	state =>({course: state.publicCourse}),
	dispatch => ({
		doFetch: id => dispatch(doFetchOneCourse(id))
	})
)
export default class extends React.Component {

	componentWillMount() {
		this.props.doFetch(this.props.params.id);
		this.setState({
			playerHeight: 0
		});
	}

	resize() {
		this.setState({playerHeight: this.refs.player.offsetHeight});
	}

	componentDidMount() {
		this.resize();
		ResizeSensor(this.refs.player.getDOMNode(), this.resize.bind(this));

		var player = videojs('my-video', {
			controls: true,
			autoplay: false,
			preload: 'auto',
			controlBar: {
				muteToggle: true
			}
		});
		console.log('player', player);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resize.bind(this));
	}

	render () {

		return (
			<div id="video">
			<div className="video-row">
				<div className="player-col" >
					<div id="my-video-wrapper" className="player-wrapper video-js vjs-16-9" ref="player" >
						{<video id="my-video"   className="vjs-tech"
						        poster="https://coolestguidesontheplanet.com/videodrome/cgp_video/leeds1974.png" controls
						        height={this.state.playerHeight}

						>
							<source src="http://7xrmd3.com1.z0.glb.clouddn.com/c747e593-e54a-4201-bfc5-6f7cb1780594.mp4" type='video/mp4' />
							<p className="vjs-no-js">
								To view this video please enable JavaScript, and consider upgrading to a web browser that
								<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
							</p>
						</video>}
					</div>
				</div>
				<div className="playlist-col" style={{height: this.state.playerHeight}}>
					<div className="auto-play"></div>
					<div className="video-name">

					</div>
					<div className="episodes"></div>
				</div>
			</div>
			</div>
		)
	}
};