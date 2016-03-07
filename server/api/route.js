"use strict";

let router = module.exports = require('koa-router')();
let videoService = require('./video/service');
let auth = require('./auth/service');
let qiniu = require('./qiniu/qiniu.service');

router.get('/', function *(){this.body= 'hello'});


router.get('/videos', videoService.getVideos);
router.post('/my-videos', auth.authenticateTokenMiddleware, videoService.saveMyVideo);
router.get('/my-videos', auth.authenticateTokenMiddleware, videoService.getMyVideos);
router.get('/my-videos/:id', auth.authenticateTokenMiddleware, videoService.getMyVideoById);

router.get('/qiniu-token/:key?', qiniu.getUptoken);

router.get('/auth/account', auth.authenticateTokenMiddleware, auth.getAccountInfo);
router.get('/auth/github', auth.oauthGithub);
