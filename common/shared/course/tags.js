import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(state=>({config: state.config}))
export class Tags extends React.Component {
	static defaultProps = {tags: []};
	static propTypes = {
		tags: PropTypes.array
	};

	render() {
		let {tags, config} = this.props;
		return (
			<div>
				{tags.map( (x)=><img src={`${config.courseTagUrl}/${x.text || x}.svg`} className="tag-img" />)}
			</div>
		)
	}
}