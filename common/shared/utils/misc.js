const bytesLevel = 'BKMG';
export const displayBytes = (bytes, level) => {
	level = level || 0;
	if (bytes <= 512) return `${bytes}${bytesLevel[level]}`;
	return displayBytes( Math.round(bytes / 1024), level + 1) ;
};

const timeLevel = ['秒', '分钟', '小时'];
export const displayDuration = (s, level, options ={displaySoon:'马上', postfix:''}) => {
	let {displaySoon, postfix} = options;
	s = Math.round(s);
	level = level || 0;
	if (s < 1) return displaySoon;
	if (s <= 30 || level >= 2) return `${s}${timeLevel[level]}${postfix}`;
	return displayDuration( s / 60, level + 1, options) ;
};

export const timeAgo = dateTime => {
	dateTime = new Date(dateTime);
	return displayDuration(
		(new Date().getTime() - dateTime.getTime()) / 1000, undefined, {displaySoon: '刚刚', postfix: '前'}
	);
};


export const arrayToObj = (array, idName="_id") => array.reduce((ret, item) => {
	let {[idName]:id, ...itemWithoutId} = item;
	return Object.assign(ret, {[id]: itemWithoutId});
}, {});

export const getRefKey = ({refType, refId}) => `${refType}/${refId}`;