import React from 'react';
import {connect} from 'react-redux';
import {doFetchPublicCourses} from './course.action';
import {Table} from 'react-bootstrap';
import TimeAgo from '../utils/TimeAgo';
import {Link} from 'react-router';
import videojs from 'video.js';

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
			<div>
				<h1>最新视频</h1>
				<Table striped hover radius>
					<thead>
					<tr>
						<th>名称</th>
						<th>上传时间</th>
					</tr>
					</thead>
					<tbody>
					{ (this.props.courses || []).map(x=> (
						<tr key={x._id}>
							<td><Link to={`/courses/${x._id}`}>{x.name}</Link></td>
							<td><TimeAgo date={x.createdOn} /></td>
						</tr>
					))}
					</tbody>
				</Table>
			</div>
		);
	}
}