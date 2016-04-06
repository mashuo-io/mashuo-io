import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux'
import {doFetchOneCourse} from './course.action';
import {Grid, Row, Col, Glyphicon, Label, Tabs, Tab, Image} from 'react-bootstrap';
import videojs from 'video.js';
import classNames from 'classnames';
import {LinkContainer} from 'react-router-bootstrap';
import {push} from 'react-router-redux';
import Toggle from 'react-toggle';
import {displayDuration} from '../utils/misc';
import {postEvent} from '../utils/event.service';
import {IconLinkGroup, IconLinkItem} from '../iconLink/IconLink';
import {CommentInput, CommentItem, CommentContainer} from '../comment/Comment';
import {courseFavoriteVideoToggled} from '../../user/profile/course-favorites.action';
import {courseHistoryVideoChanged} from '../../user/profile/course-histories.action';
import {Like} from '../like/Like';

@connect(
	(state, ownProps) =>{
		let {params: {id: courseId}} = ownProps;
		return {
			course: state.publicCourse.course,
			courseFavorite: state.courseFavorites[courseId] || {},
			courseHistory: state.courseHistories[courseId] || {durationWatched:0, videos:{}},
			config: state.config
		};
	},
	dispatch => ({
		doFetch: id => dispatch(doFetchOneCourse(id)),
		push: url => dispatch(push(url)),
		toggleFavorite: (courseId, videoId) => dispatch(courseFavoriteVideoToggled({courseId, videoId})),
		changeHistory: ({courseId, videoId, status, durationWatched}) => dispatch(courseHistoryVideoChanged({courseId, videoId, status, durationWatched}))
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

	saveEvent = (type, data = {}) => {
		let {
			course: {videos=[], _id: courseId},
			params: {index = 0}
		} = this.props;
		let {_id: videoId} = videos[index];

		postEvent(`video-${type}`, {...data, videoId, courseId});
	};

	changeVideoHistory = ({status, durationWatched}) => {
		let {changeHistory, course: {_id: courseId, videos}, params: {index=0}} = this.props;
		let {_id: videoId} = videos[index];
		changeHistory({courseId, videoId, status, durationWatched});
	};

	render () {
		if (!this.props.course) return <div>Loading</div>;
		let {
			course: {name, videos=[], _id, duration, tags =[], createdBy: { github: {login: author}}},
			courseFavorite, courseHistory,
			params: {index = 0},
			config: {videoDownloadUrl},
			toggleFavorite,
			changeHistory
			} = this.props;
		let currentVideo = videos[index];
		return (
			<div id="video-wrapper">
				<div className="video-player">
					<div className="video-row">
						<div className="player-col" >
							<Player src={currentVideo.src} poster={currentVideo.poster} ref="player"
							        next={this.next} emitEvent={this.saveEvent} startTime={(courseHistory.videos[currentVideo._id] || {}).durationWatched}
							        changeVideoHistory = {this.changeVideoHistory}
							/>
						</div>
						<div className="playlist-col" ref="playlist" >
							<div className="auto-play">
								<Toggle defaultChecked={true} />
									<span >自动播放</span>
							</div>
							<div className="course-name">
								<h4>{name}</h4>
                                <IconLinkGroup>
                                    {tags.map(t => <IconLinkItem key={t} className="tags" text={t}></IconLinkItem>)}
                                </IconLinkGroup>
								<IconLinkGroup>
									<IconLinkItem icon={<Glyphicon glyph="film" />} text={`${videos.length}段视频`}></IconLinkItem>
									<IconLinkItem icon={<Glyphicon glyph="time" />} text={displayDuration(duration)}></IconLinkItem>
								</IconLinkGroup>
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
													<div>{x.name}</div>
													<IconLinkGroup>
														<IconLinkItem icon={<Glyphicon glyph="time" />} text={displayDuration(x.duration)}></IconLinkItem>
														{
															index == i ?
																<IconLinkItem text="正在播放" textClassName="playing"></IconLinkItem> : null
														}
													</IconLinkGroup>
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
							<h3 className="title">{currentVideo.name}</h3>
                            <IconLinkGroup>
                                <IconLinkItem icon={<Glyphicon glyph="time" />} text={displayDuration(currentVideo.duration)}></IconLinkItem>
                            </IconLinkGroup>
							<p>{currentVideo.description}</p>
							<IconLinkGroup>
								<IconLinkItem icon={<Glyphicon glyph="user" />} text={author}></IconLinkItem>
								<IconLinkItem icon={<Glyphicon glyph="expand" />} text={`${currentVideo.timesWatched}次`}></IconLinkItem>
								<IconLinkItem icon={<Glyphicon glyph="star" />} text="收藏" activeIcon={courseFavorite[currentVideo._id]} onIconClick={()=>{
									this.saveEvent('favoriteToggled');
									toggleFavorite(_id, currentVideo._id);
								}} />
								<IconLinkItem icon={<Glyphicon glyph="share-alt" />} text="源程序" iconUrl={currentVideo.codeUrl} textUrl={currentVideo.codeUrl} ></IconLinkItem>
								<Like className="pull-right" refType="video" refId={currentVideo._id} />
							</IconLinkGroup>
						</div>
				</div>

				<div className="video-tabs">
					<Tabs activeKey={this.state.key} onSelect={this.handleSelect} className="video-tab-container nav-tabs-stylish">
						<Tab eventKey={1} title="评论">
                            <CommentContainer>
                                <CommentInput
                                    avatarUrl="../../../assets/video/avatar.jpg"
                                />

                                <CommentItem
                                    avatarUrl="../../../assets/video/avatar.jpg"
                                    author="ezhui"
                                    text="2009年9月14日，文昌卫星发射中心建设工程举行开工典礼，历经7年建设，目前该工程基本竣工。据报道，该发射中心现已具备发射长征五号系列火箭与长征七号运载火箭的能力。"
                                    when="半小时前"
                                />

                                <CommentItem
                                    avatarUrl="../../../assets/video/avatar.jpg"
                                    author="ezhui"
                                    text="2009年9月14日，文昌卫星发射中心建设工程举行开工典礼，历经7年建设，目前该工程基本竣工。据报道，该发射中心现已具备发射长征五号系列火箭与长征七号运载火箭的能力。"
                                    when="半小时前"
                                />
                            </CommentContainer>
						</Tab>
					</Tabs>
				</div>
			</div>
		)
	}
};

@connect(
	state=>({config: state.config})
)
class Player extends React.Component {
	static defaultProps = {
		startTime: 0,
		emitEvent: ()=>{},
		changeVideoHistory: ()=>{}
	};
	static propTypes = {
		config: PropTypes.object,
		src: PropTypes.string,
		poster: PropTypes.string,
		next: PropTypes.func,
		startTime: PropTypes.number,
		emitEvent: PropTypes.func,
		changeVideoHistory: PropTypes.func
	};
	player;
	lastTimeUpdateEmitted = 0;
	status = 'init';

	componentDidMount() {
		let {poster, src, startTime, emitEvent, config, changeVideoHistory} = this.props;
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
			player.on('play', ()=>{
				if (self.status === 'ended' || self.status === 'init') emitEvent('times');
				self.status = 'playing';
			});

			player.on('ended', ()=>{
				emitEvent('ended');
				self.status = 'ended';
				changeVideoHistory({status: 'watched', durationWatched: player.duration()});
				//self.props.next();
			});
			player.on('seeked', ()=>emitEvent('seeked', {currentTime: player.currentTime()}));
			player.on('timeupdate', ()=>{
				let currentTime = player.currentTime();
				if ( currentTime - self.lastTimeUpdateEmitted > config.intervalVideoTimeUpdate) {
					self.lastTimeUpdateEmitted = currentTime;
					emitEvent('timeupdate', {currentTime});
					changeVideoHistory({status: 'watching', durationWatched: currentTime});
				}
			});
			//player.play();
		});
	}

	componentDidUpdate() {
		if (!this.player) return;
		let {poster, src, startTime} = this.props;

		if (this.player.currentSrc() !== src) {
			this.player.poster(poster);
			this.player.src({type: 'video/mp4', src});
			this.lastTimeUpdateEmitted = 0;
			this.player.currentTime(0);
			this.player.play();
			this.ended = false;
		}
		if (startTime > this.player.currentTime() ) this.player.currentTime(startTime);
	}

	render = () => (
		<div id="my-video-wrapper" className="player-wrapper video-js vjs-default-skin vjs-16-9" ref="target"></div>
	);
}