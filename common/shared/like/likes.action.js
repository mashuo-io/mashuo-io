import axios from '../utils/server-request.service';
import {myLikeChanged} from '../../user/profile/my-likes.action';

export const mergeLikes = (likes) => ({type: `LIKES.MERGED`, likes });

export const likesChanged = ({refType, refId, doLike}) => ({type: 'LIKES.CHANGED', refType, refId, doLike});

export const issueLike = ({refType, refId, doLike}) => dispatch => {
	(doLike
		? axios.post(`/${refType}/${refId}/feedbacks/like`)
		: axios.delete(`/${refType}/${refId}/feedbacks/like`) )
	.then(x=>{
		dispatch(likesChanged({refType, refId, doLike}));
		dispatch(myLikeChanged({refType, refId, doLike}));
	})
};