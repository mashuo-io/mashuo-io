import React from 'react';
import {connect} from 'react-redux';
import {doFetchMyVideos} from './video.action';
import {Table, Button} from 'amazeui-react';
import {push} from 'react-router-redux';

export class VideoList extends React.Component {
	componentWillMount() {
		if (!this.props.videos) this.props.doFetch();
	}
	render() {
		return (
			<div>
				<h1>我的视频</h1>
				<Button amStyle="primary" onClick={this.props.newVideo}>新建视频</Button>
				<Table striped hover radius>
					<thead>
					<tr>
						<th>名称</th>
						<th>状态</th>
						<th>上传时间</th>
					</tr>
					</thead>
					<tbody>
					{ (this.props.videos || []).map(x=> (
						<tr key={x._id}>
							<td>{x.name}</td>
							<td>{x.status === 'new' ? '未发布': '已发布'}</td>
							<td><TimeAgo date={x.createdOn} /></td>
						</tr>
					))}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default connect(
	(state)=> {
		return {
			...state.myVideo

		}
	},
	dispatch=> {
		return {
			doFetch: () => dispatch(doFetchMyVideos),
			newVideo: ()=> dispatch(push('/new-video'))
		}
	}
)(VideoList)
