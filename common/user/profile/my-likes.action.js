import axios from '../../shared/utils/server-request.service';

export const loadMyLikes = () => dispatch =>
	axios.get('/my-profile/likes')
	.then(res=>res.body)
	.then(data=>dispatch(myLikesLoaded(data)));

export const myLikesLoaded = likes => ({type: 'MY_LIKES.LOADED', likes});

export const myLikeChanged = ({refType, refId, like}) => ({type: 'MY_LIKES.CHANGED', refType, refId, like});