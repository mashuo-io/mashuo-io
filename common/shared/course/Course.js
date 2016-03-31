import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux'
import {doFetchOneCourse} from './course.action';
import {Grid, Row, Col, Input, Glyphicon, Label, Tabs, Tab} from 'react-bootstrap';
import videojs from 'video.js';
import classNames from 'classnames';
import {LinkContainer} from 'react-router-bootstrap';
import {push} from 'react-router-redux';
import Toggle from 'react-toggle';
import {displayDuration} from '../utils/misc';
import {postEvent} from '../utils/event.service';

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
	constructor(props) {
		super(props);
		this.state = {
			key: 1
		};
	}

	componentWillMount() {
		this.props.doFetch(this.props.params.id);
	}

	resize = ()=> {
		let player = findDOMNode(this.refs.player);
		let playlist = findDOMNode(this.refs.playlist);
		if (player && playlist)	playlist.style.height = `${player.offsetHeight}px`;
	};

	handleSelect = (key) => {
		this.setState({key});
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

	saveEvent = (type, data) => {
		let {
			course: {videos=[], _id: courseId},
			params: {index = 0}
		} = this.props;
		let {_id: videoId} = videos[index];

		postEvent(`video-${type}`, {...data, videoId, courseId});
	};

	render () {
		if (!this.props.course) return <div>Loading</div>;
		let {
			course: {name, videos=[], _id},
			params: {index = 0},
			config: {videoDownloadUrl}
			} = this.props;
		return (
			<div id="video-wrapper">
				<div className="video-player">
					<div className="video-row">
						<div className="player-col" >
							<Player src={videos[index].src} poster={videos[index].poster} ref="player" next={this.next} emitEvent={this.saveEvent} />
						</div>
						<div className="playlist-col" ref="playlist" >
							<div className="auto-play">
								<Toggle defaultChecked={true} />
									<span >自动播放</span>
							</div>
							<div className="course-name">
								<h4>{name}</h4>
								<div className="icon-message-group">
									<div className="icon-message">
										<Glyphicon glyph="film" className="icon"/>
										<span className="message">2段视频</span>
									</div>

									<div className="icon-message">
										<Glyphicon glyph="time" className="icon"/>
										<span className="message">45分钟</span>
									</div>
								</div>
							</div>
							<div className="videos">
								{
									videos.map((x, i)=>(
										<LinkContainer to={this.getVideoUrl(i)} key={i}>
											<div className={classNames('video', {current: index == i})} >
												<div className="index">
													{index == i ? <Glyphicon glyph="play" /> : <span>{i+1}</span>}
												</div>
												<div className="name">
													<div>
														{x.name}
													</div>
													<div className="icon-message-group">
														<div className="icon-message">
															<Glyphicon glyph="time" className="icon"/>
															<span className="message">{displayDuration(x.duration)}</span>
														</div>
														<div className="icon-message">
															{
																index == i ?
																	<span className="message playing">
																	正在播放
																</span>
																	: null
															}
														</div>
													</div>
												</div>
											</div>
										</LinkContainer>
									))
								}
							</div>
						</div>
					</div>
				</div>

				<div className="video-info">
						<div className="video-info-content">
							<h3 className="title">视屏标题</h3>
							<Glyphicon glyph="time" className="video-labels"/>

							<span className="video-labels">5:09</span>
							<span className="video-labels">Javascript</span>
							<span className="video-labels">Webpack</span>

							<p>
								以下一组图片是前些年拍摄的居庸关附近京张铁路老图，很多机车、列车都已不再经由此处。对比之间，也感受到岁月的变迁。正可谓年年岁岁花相似，岁岁年年人不同。在我看来，摄影除了美，更大的价值便是记录那些不为人关注的历史与变迁。以下一组图片是前些年拍摄的居庸关附近京张铁路老图，很多机车、列车都已不再经由此处。对比之间，也感受到岁月的变迁。正可谓年年岁岁花相似，岁岁年年人不同。在我看来，摄影除了美，更大的价值便是记录那些不为人关注的历史与变迁。
							</p>

							<div className="icon-message-group">
								<div className="icon-message">
									<Glyphicon glyph="user" className="icon"/>
									<span className="message">Ron</span>
								</div>

								<div className="icon-message">
									<Glyphicon glyph="expand" className="icon"/>
									<span className="message">201次</span>
								</div>

								<div className="icon-message">
									<Glyphicon glyph="star" className="icon"/>
									<a href="javascript:;" className="message"><span>收藏</span></a>
								</div>

								<div className="icon-message pull-right">
									<a href="javascript:;" className="message"><Glyphicon glyph="thumbs-down"/></a>
								</div>

								<div className="icon-message pull-right">
									<a href="javascript:;" className="message"><Glyphicon glyph="thumbs-up"/></a>
								</div>
							</div>
						</div>
				</div>

				<div className="video-tabs">
					<Tabs activeKey={this.state.key} onSelect={this.handleSelect} className="video-tab-container">
						<Tab eventKey={1} title="评论">Tab 1 content</Tab>
					</Tabs>
				</div>
			</div>
		)
	}
};

@connect(state=>({config: state.config}))
class Player extends React.Component {
	static defaultProps = {
		startTime: 0,
		emitEvent: ()=>{}
	};
	static propTypes = {
		src: PropTypes.string,
		poster: PropTypes.string,
		next: PropTypes.func,
		startTime: PropTypes.number,
		emitEvent: PropTypes.func
	};
	player;
	lastTimeUpdateEmitted = 0;

	componentDidMount() {
		console.log('mountinggg');
		let {poster, src, startTime, emitEvent, config} = this.props;
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
			let player = self.player = this;
			player.currentTime(startTime);

			player.on('ended', ()=>{
				self.props.next();
				emitEvent('ended')
			});
			player.on('seeked', ()=>emitEvent('seeked', {currentTime: player.currentTime()}));
			player.on('timeupdate', ()=>{
				let currentTime = player.currentTime();
				if ( self.lastTimeUpdateEmitted === 0
					|| currentTime - self.lastTimeUpdateEmitted > config.intervalVideoTimeUpdate) {
					self.lastTimeUpdateEmitted = currentTime;
					emitEvent('timeupdate', {currentTime});
				}
			});
		});
	}

	componentDidUpdate() {
		let {poster, src} = this.props;
		this.player.poster(poster);
		this.player.src({type: 'video/mp4', src});
		this.lastTimeUpdateEmitted = 0.1;
		//this.player.play();
	}

	render() {
		let {poster, src} = this.props;
		return (
			<div id="my-video-wrapper" className="player-wrapper video-js vjs-default-skin vjs-16-9" ref="target"></div>
		);
	};
}