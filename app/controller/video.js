'use strict';

const Controller = require('egg').Controller;
const checkAgent = require('../utils/checkagent');
class VideoController extends Controller {

  // 添加视频
  async create() {
    try {
      const body = await this.ctx.request.body;
      await this.ctx.service.video.createVideo(body);
      this.ctx.body = {
        code: 20000,
        message: true,
      };
    } catch (error) {
      this.ctx.body = {
        code: 30000,
        message: false,
      };
    }
  }

  // 删除视频
  async destroy() {
    try {
      const id = await this.ctx.params.id;
      const destroy = await this.ctx.service.video.deleteVideo(id);
      this.ctx.body = {
        code: 20000,
        message: true,
      };
    } catch (error) {
      this.ctx.body = {
        code: 30000,
        message: false,
      };
    }
  }
  // 修改视频
  async update() {
    try {
      const body = await this.ctx.request.body;
      const id = await this.ctx.params.id;
      const update = await this.ctx.service.video.updateVideo(id, body);
      this.ctx.body = {
        code: 20000,
        message: update,
      };
    } catch (error) {
      this.ctx.body = {
        code: 30000,
        message: false,
      };
    }
  }

  async show() {
    try {
      const id = await this.ctx.params.id;
      const video = await this.ctx.service.video.getVideoById(id);
      this.ctx.body = {
        code: 20000,
        message: true,
        data: video,
      };
    } catch (error) {
      console.log(error);
      this.ctx.body = {
        code: 30000,
        message: false,
      };
    }
  }

  async index() {
    try {
      const query = this.ctx.request.query;
      const videoList = await this.ctx.service.video.getVideoList(query);
      this.ctx.body = {
        code: 20000,
        message: true,
        data: videoList,
      };
    } catch (error) {
      console.log(error);
      this.ctx.body = {
        code: 30000,
        message: false,
      };
    }
  }

  // 视频列表页面
  async getVideoList() {
    const { ctx } = this;
    const ua = checkAgent(ctx.request.header['user-agent']);
    const key = this.ctx.params.key;
    const data = await this.ctx.service.website.getVideoList(key);
    if (ua) {
      await ctx.render('pc/video.html', data);
    } else {
      await ctx.render('phone/video.html', data);
    }
  }
  // 视频详情页面
  async getVideoDetail() {
    const { ctx } = this;
    const ua = checkAgent(ctx.request.header['user-agent']);
    const id = this.ctx.params.id;
    const data = await this.ctx.service.website.getVideoDetail(id);
    if (ua) {
      await ctx.render('pc/video_detail.html', data);
    } else {
      await ctx.render('phone/video_detail.html', data);
    }
  }
}

module.exports = VideoController;
