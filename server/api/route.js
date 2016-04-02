let router = module.exports = require('koa-router')();
import {getCourses, getCourse, saveMyCourse, getMyCourses, getMyCourseById} from './course/course.service';
import {authenticateTokenMiddleware, oauthGithub, getAccountInfo, getTokenMiddleware} from './auth/service';
import qiniu from './qiniu/qiniu.service';
import {getFeedbacks, getFeedbackStatics, saveFeedback, delFeedback} from './feedback/feedback.service';
import {getMyFavorites, getMyFavoriteById, getMyWatchHistories, getMyWatchHistoryById} from './profile/profile.service';
import {saveEvent} from './event/event.service';

router.get('/', function *(){this.body= 'hello'});

router.get('/courses', getCourses);
router.get('/courses/:id', getCourse);
router.post('/my-courses', authenticateTokenMiddleware, saveMyCourse);
router.get('/my-courses', authenticateTokenMiddleware, getMyCourses);
router.get('/my-courses/:id', authenticateTokenMiddleware, getMyCourseById);

router.get('/qiniu-token/:key', qiniu.getUptoken);

router.get('/auth/account', authenticateTokenMiddleware, getAccountInfo);
router.get('/auth/github', oauthGithub);

//feedback
router.get('/:refType/:refId/feedbacks', authenticateTokenMiddleware, getFeedbacks);
router.get('/:refType/:refId/feedbacks-statistics', authenticateTokenMiddleware, getFeedbackStatics);
router.post('/:refType/:refId/feedbacks/:type', authenticateTokenMiddleware, saveFeedback);
router.del('/:refType/:refId/feedbacks/:_id', authenticateTokenMiddleware, delFeedback);

//profile
router.get('/my-profile/watch-histories', authenticateTokenMiddleware, getMyWatchHistories);
router.get('/my-profile/watch-history/:courseId', authenticateTokenMiddleware, getMyWatchHistoryById);

//favorite
router.get('/my-profile/favorites', authenticateTokenMiddleware, getMyFavorites);
router.get('/my-profile/favorites/:courseId', authenticateTokenMiddleware, getMyFavoriteById);

//event
router.post('/events', getTokenMiddleware, saveEvent);