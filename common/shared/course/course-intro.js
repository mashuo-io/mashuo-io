import React from 'react';
import {doFetchOneCourse} from './course.action';
import {connect} from 'react-redux';
import {Jumbotron, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

@connect(
	state =>state.publicCourse,
	dispatch => ({
		doFetch: id => dispatch(doFetchOneCourse(id))
	})
)
export default class extends React.Component {
	componentWillMount() {
		this.props.doFetch(this.props.params.id);
	}

	render() {
		let {name, videos=[], description, _id} = this.props.course || {};
		return (
			<div className="container-fluid">
			<Jumbotron>
				<h1>{name}</h1>
				<p>{description}</p>
				<p>
					<LinkContainer to={`/course/${_id}`}>
						<Button bsStyle="primary" bsSize="large">观看所有视频({videos.length})</Button>
					</LinkContainer>
				</p>
			</Jumbotron>
			</div>
		)
	}
}