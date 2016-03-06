"use strict";

let router = module.exports = require('koa-router')();
let videoService = require('./video/service');
let auth = require('./auth/service');

router.get('/', function *(){this.body= 'hello'});

router.get('/videos', videoService.getVideos);
router.post('/my-videos', auth.authenticateTokenMiddleware, videoService.saveMyVideo);
router.get('/my-videos', auth.authenticateTokenMiddleware, videoService.getMyVideos);

router.get('/auth/github', auth.oauthGithub);