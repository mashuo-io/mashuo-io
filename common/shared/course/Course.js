import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux'
import {doFetchOneCourse} from './course.action';
import {Row, Col, Input, Glyphicon} from 'react-bootstrap';
import videojs from 'video.js';
import "./course.scss";
import classNames from 'classnames';
import {LinkContainer} from 'react-router-bootstrap';
import {push} from 'react-router-redux';
import {displayDuration} from '../utils/misc';

@connect(
	state =>({
		course: state.publicCourse.course,
		config: state.config
	}),
	dispatch => ({
		doFetch: id => dispatch(doFetchOneCourse(id)),
		push: url => dispatch(push(url))
	})
)
export default class extends React.Component {
	componentWillMount() {
		this.props.doFetch(this.props.params.id);
	}

	resize = ()=> {
		let player = findDOMNode(this.refs.player);
		let playlist = findDOMNode(this.refs.playlist);
		if (player && playlist)	playlist.style.height = `${player.offsetHeight}px`;
	};

	componentDidMount() {
		window.addEventListener('resize', this.resize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resize);
	}

	componentDidUpdate () {
		this.resize();
	}

	getVideoUrl = (i) => `/course/${this.props.course._id}/video/${i}`;

	next = ()=> {
		let {params: {index = 0}, course: {videos=[]}, push} = this.props;
		index = parseInt(index);
		if (index < videos.length - 1)  push(this.getVideoUrl(index + 1));
	};

	render () {
		if (!this.props.course) return <div>Loading</div>;
		let {
			course: {name, videos=[], _id},
			params: {index = 0},
			config: {videoDownloadUrl}
			} = this.props;
		console.log('rendering', videos, index);
		return (
			<div id="video">
				<div className="video-row">
					<div className="player-col" >
						<Player src={videos[index].src} poster={videos[index].poster} ref="player" next={this.next} />
					</div>
					<div className="playlist-col" ref="playlist" >
						<div className="auto-play">
							<Input type="checkbox" label="自动播放"  />
						</div>
						<div className="course-name">
							{name}
						</div>
						<div className="videos">
							{
								videos.map((x, i)=>(
									<LinkContainer to={this.getVideoUrl(i)} key={i}>
										<div className={classNames('video', {current: index == i})} >
											<div className="index">
												{index == i ? <Glyphicon glyph="play" /> : <span>{i+1}</span>}
											</div>
											<div className="name">{x.name} {displayDuration(x.duration)}</div>
										</div>
									</LinkContainer>
								))
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
};

class Player extends React.Component {
	static defaultProps = {
		poster: "https://embedwistia-a.akamaihd.net/deliveries/585f692314033b3a850f9a312b2393ee736a183a.jpg?image_crop_resized=640x360"
	};
	static propTypes = {
		src: PropTypes.string,
		poster: PropTypes.string,
		next: PropTypes.func
	};
	video;
	player;

	componentDidMount() {
		let {poster, src} = this.props;
		let video = document.createElement('video');
		video.setAttribute('poster', poster);
		video.setAttribute('class', 'vjs-tech');

		let source = document.createElement('source');
		source.setAttribute('src', src);
		source.setAttribute('type', 'video/mp4');

		video.appendChild(source);
		video.innerHTML= `
				<source src="${src}" type='video/mp4'/>
				<p class="vjs-no-js">
					To view this video please enable JavaScript, and consider upgrading to a web browser that
					<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
				</p>
		`;

		findDOMNode(this.refs.target).appendChild(video);
		let self = this;
		videojs(video, {
			controls: true,
			autoplay: false,
			preload: 'auto',
			controlBar: {
				muteToggle: true
			}
		}).ready(function(){
			self.player = this;
			this.on('ended', self.props.next)
		});
		this.video = video;
		this.source = source;
	}

	componentDidUpdate() {
		let {poster, src} = this.props;
		this.player.poster(poster);
		this.player.src({type: 'video/mp4', src});
		//this.player.play();
	}

	render() {
		let {poster, src} = this.props;
		return (
			<div id="my-video-wrapper" className="player-wrapper video-js vjs-16-9" ref="target"></div>
		);
	};
}