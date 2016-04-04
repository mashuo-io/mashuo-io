const bytesLevel = 'BKMG';
export const displayBytes = (bytes, level) => {
	level = level || 0;
	if (bytes <= 512) return `${bytes}${bytesLevel[level]}`;
	return displayBytes( Math.round(bytes / 1024), level + 1) ;
};

const timeLevel = ['秒', '分钟', '小时'];
export const displayDuration = (s, level) => {
	s = Math.round(s);
	level = level || 0;
	if (s < 1) return '马上';
	if (s <= 30 || level >= 2) return `${s}${timeLevel[level]}`;
	return displayDuration( s / 60, level + 1) ;
};

export const arrayToObj = (array, idName="_id") => array.reduce((ret, item) => {
	let {[idName]:id, ...itemWithoutId} = item;
	return Object.assign(ret, {[id]: itemWithoutId});
}, {});