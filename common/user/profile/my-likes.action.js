import axios from '../../shared/utils/server-request.service';

export const loadMyLikes = () => dispatch =>
	axios.get('/my-profile/likes')
	.then(res=>res.data)
	.then(data=>dispatch(myLikesLoaded(data)));

export const myLikesLoaded = likes => ({type: 'MY_LIKES.LOADED', likes});

export const myLikeChanged = ({refType, refId, doLike}) => ({type: 'MY_LIKES.CHANGED', refType, refId, doLike});

export const clean = () => ({type: 'MY_LIKES.CLEAN'});