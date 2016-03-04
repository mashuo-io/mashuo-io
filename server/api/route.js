"use strict";

let router = module.exports = require('koa-router')();
let videoService = require('./video/service');


router.get('/', function *(){this.body= 'hello'});

router.post('/videos', videoService.saveVideos);
router.get('/videos', videoService.getVideos);