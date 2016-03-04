import React from 'react';
import {connect} from 'react-redux';
import {doFetch} from './video.action';

class Video extends React.Component {
	componentWillMount() {
		this.props.doFetch();
	}
	render() {
		if (this.props.isFetching) return <p>Spining</p>;

		return (
			<ul>
				{ this.props.videos.map(x=> <li key={x}> {x.name} </li>) }
			</ul>
		);
	}
}

const stateToProps = state=> state.video;

const dispatchToProps = dispatch => {
	return {
		doFetch: () => {dispatch(doFetch())}
	}
};

export default connect(stateToProps, dispatchToProps)(Video);
