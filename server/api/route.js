"use strict";

let router = module.exports = require('koa-router')();
let videoService = require('./course/service');
let auth = require('./auth/service');
let qiniu = require('./qiniu/qiniu.service');

router.get('/', function *(){this.body= 'hello'});


router.get('/courses', videoService.getCourses);
router.get('/courses/:id', videoService.getCourse);
router.post('/my-courses', auth.authenticateTokenMiddleware, videoService.saveMyCourse);
router.get('/my-courses', auth.authenticateTokenMiddleware, videoService.getMyCourses);
router.get('/my-courses/:id', auth.authenticateTokenMiddleware, videoService.getMyCourseById);

router.get('/qiniu-token/:key?', qiniu.getUptoken);

router.get('/auth/account', auth.authenticateTokenMiddleware, auth.getAccountInfo);
router.get('/auth/github', auth.oauthGithub);
