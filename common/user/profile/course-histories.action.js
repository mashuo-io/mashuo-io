import axios from '../../shared/utils/server-request.service';
import {arrayToObj} from '../../shared/utils/misc';

export const loadCourseHistories = () => dispatch => {
	axios.get('/my-profile/watch-histories')
	.then(res=>res.data)
	.then(arrayToObj)
	.then(data=>dispatch(courseHistoriesLoaded(data)));
};

export const courseHistoriesLoaded = courseHistories => ({
	type: 'COURSE_HISTORIES.LOADED',
	courseHistories
});

export const courseHistoryVideoChanged = ({courseId, videoId, status, durationWatched}) =>({
	type: 'COURSE_HISTORIES.VIDEO_CHANGED',
	courseId, videoId, status, durationWatched
});