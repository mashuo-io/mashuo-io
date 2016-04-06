export const mergeLikes = (likes) => ({type: `LIKES.MERGED`, likes });

export const changeLike = ({refType, refId, doLike}) => ({type: 'LIKES.CHANGED', refType, refId, doLike});