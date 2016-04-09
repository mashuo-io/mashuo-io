import React from 'react';
import {connect} from 'react-redux';
import {doFetchPublicCourses} from './course.action';
import {Table} from 'react-bootstrap';
import {TimeAgo} from '../utils/TimeAgo';
import {LinkContainer} from 'react-router-bootstrap';
import {displayDuration} from '../utils/misc';
import {IconLinkGroup, IconLinkItem} from '../iconLink/IconLink';
import {Col, Row, Glyphicon} from 'react-bootstrap';
import {VideoItem} from '../VideoItem/VideoItem';

@connect(
	state=> state.publicCourseList,
	dispatch => {
		return {
			doFetch: () => dispatch(doFetchPublicCourses())
		}
	}
)
export default class extends React.Component {
	componentWillMount() {
		if (!this.props.courses) this.props.doFetch();
	}
	render() {
		return (
			<div id="latest-video">
				<h3>最新视频</h3>
				<Row className="video-list-container">
					{ (this.props.courses || []).map( (x, i)=> (
						<VideoItem
							key={i}
							link={`/course/${x._id}`}
							title={x.name}
							createdOn={x.createdOn}
							duration={displayDuration(x.duration)}
							videoCount={x.videos.length}
							imageUrl={x.coverImageUrl}
						/>

					))}
				</Row>
			</div>
		);
	}
}

