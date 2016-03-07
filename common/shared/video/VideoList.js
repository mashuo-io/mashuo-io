import React from 'react';
import {connect} from 'react-redux';
import {doFetchPublicVideos} from './video.action';
import {Table} from 'amazeui-react';
import TimeAgo from 'react-timeago';


@connect(
	state=> state.publicVideo,
	dispatch => {
		return {
			doFetch: () => dispatch(doFetchPublicVideos())
		}
	}
)
export default class VideoList extends React.Component {
	componentWillMount() {
		if (!this.props.videos) this.props.doFetch();
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
					{ (this.props.videos || []).map(x=> (
						<tr key={x._id}>
							<td>{x.name}</td>
							<td><TimeAgo date={x.createdOn} /></td>
						</tr>
					))}
					</tbody>
				</Table>
			</div>
		);
	}
}