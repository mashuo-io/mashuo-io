import React from 'react';
import {connect} from 'react-redux';
import {doFetchMyCourses} from './course.action';
import {Table, Button} from 'react-bootstrap';
import {push} from 'react-router-redux';
import TimeAgo from '../utils/TimeAgo';

@connect(
	state => state.myCourse,
	dispatch => ({
		doFetch: () => dispatch(doFetchMyCourses()),
		newCourse: ()=> dispatch(push('/my-course/new')),
		editCourse: course=> dispatch(push(`/my-course/edit/${course._id}`))
	})
)
export default class extends React.Component {
	componentWillMount() {
		this.props.doFetch();
	}
	render() {
		return (
			<div className="container-fluid">
				<h1>我的课程</h1>
				<Button amStyle="primary" onClick={this.props.newCourse}>新建课程</Button>
				<Table striped condensed hover>
					<thead>
					<tr>
						<th>名称</th>
						<th>状态</th>
						<th>上传时间</th>
						<th>动作</th>
					</tr>
					</thead>
					<tbody>
					{ (this.props.courses || []).map(x=> (
						<tr key={x._id}>
							<td>{x.name}</td>
							<td>{x.status === 'new' ? '未发布': '已发布'}</td>
							<td><TimeAgo date={x.createdOn}  /></td>
							<td><Button onClick={()=>this.props.editCourse(x)}>编辑</Button></td>
						</tr>
					))}
					</tbody>
				</Table>
			</div>
		);
	}
}