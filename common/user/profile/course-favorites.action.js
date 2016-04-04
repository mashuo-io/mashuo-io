import axios from '../../shared/utils/server-request.service';
import {arrayToObj} from '../../shared/utils/misc';

export const loadcourseFavorites = () => dispatch => {
	axios.get('/my-profile/favorites')
	.then(res=>res.data)
	.then(data=>arrayToObj(data, 'course'))
	.then(data=>Object.keys(data).reduce((ret, key)=> {
		ret[key] = data[key].videos;
		return ret;
	}, {}))
	.then(data=>dispatch(courseFavoritesLoaded(data)));
};

export const courseFavoritesLoaded = courseFavorites => ({
	type: 'COURSE_FAVORITES.LOADED',
	courseFavorites
});

export const courseFavoriteVideoToggled = ({courseId, videoId}) => ({
	type: 'COURSE_FAVORITES.VIDEO_TOGGLED',
	courseId, videoId
});
