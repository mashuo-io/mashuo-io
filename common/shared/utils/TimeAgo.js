import React from 'react';
import TimeAgo from 'react-timeago';

let translate = {
	second: '秒',
	minute: '分钟',
	hour: '小时',
	day: '天',
	week: '周',
	month: '个月',
	year: '年'
};

let formatter = (value, unit, suffix) => {
	if (unit === 'second') return '刚刚';

	return `${value}${translate[unit]}前`;
};

export default (props) => (
	<TimeAgo date={props.date}
	         formatter={formatter}
	         minPeriod={3 * 60 * 1000}
	/>
)