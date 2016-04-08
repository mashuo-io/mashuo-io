import React, {PropTypes} from 'react';
import {timeAgo} from '../utils/misc';

export class TimeAgo extends React.Component {
	state={};

	static propTypes= {
		date: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date)
		]).isRequired
	};

	componentWillMount = () => {
		let {date} = this.props;
		date = new Date(date);

		const func = () =>this.setState({timeAgo: timeAgo(date)});
		func();
		if ((new Date).getTime() - date.getTime() > 1000 * 3600 * 24) return;
		this.interval = setInterval(func, 1000* 60);
	};
	componentWillUnmount = () => {
		if (this.interval)	clearInterval(this.interval);
	};

	render =()=><span>{this.state.timeAgo}</span>

}