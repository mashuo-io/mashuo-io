"use strict";

let router = module.exports = require('koa-router')();
let videoService = require('./video/service');
let auth = require('./auth/service');

router.get('/', function *(){this.body= 'hello'});

router.post('/videos', videoService.saveVideos);
router.get('/videos', videoService.getVideos);

router.get('/auth/github', auth.oauthGithub);
router.get('/auth/github/callback', auth.oauthGithubCallback);