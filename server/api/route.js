"use strict";

let router = module.exports = require('koa-router')();
let courseService = require('./course/course.service');
let auth = require('./auth/service');
let qiniu = require('./qiniu/qiniu.service');

router.get('/', function *(){this.body= 'hello'});


router.get('/courses', courseService.getCourses);
router.get('/courses/:id', courseService.getCourse);
router.post('/my-courses', auth.authenticateTokenMiddleware, courseService.saveMyCourse);
router.get('/my-courses', auth.authenticateTokenMiddleware, courseService.getMyCourses);
router.get('/my-courses/:id', auth.authenticateTokenMiddleware, courseService.getMyCourseById);

router.get('/qiniu-token/:key?', qiniu.getUptoken);

router.get('/auth/account', auth.authenticateTokenMiddleware, auth.getAccountInfo);
router.get('/auth/github', auth.oauthGithub);
