const levels = 'BKMG';
export const displayBytes = (bytes, level) => {
	level = level || 0;
	if (bytes <= 512) return `${bytes}${levels[level]}`;
	return displayBytes( Math.round(bytes / 1024), level +1) ;
};