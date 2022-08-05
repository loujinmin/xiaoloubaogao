'use strict';

const Service = require('egg').Service;
const queryString = require('querystring');
const crypto = require('crypto');

class WebsitService extends Service {

  async getHomePageData() { // 首页
    const bookList = await this.ctx.service.book.getBookList({ page: 1, total: 3 }); // 推荐书
    const blogList = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 }); // 推荐博客
    const recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 1 }); // 推荐书
    const recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 }); // 推荐博客
    const videoList = await this.ctx.service.video.getVideoList({ page: 1, total: 3 }); // 推荐一个视频
    const title = '首页-小娄报告';
    return {
      bookList,
      blogList,
      videoList,
      recommendBook,
      recommendBlog,
      title,
    };
  }

  async getBookList() { // 电子书列表
    const bookList = await this.ctx.service.book.getBookList({ page: 1, total: 100 }); // 所有书籍
    const recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 3 }); // 推荐书
    const recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 }); // 推荐博客
    const recommendVideo = await this.ctx.service.video.getVideoList({ page: 1, total: 3 }); // 推荐一个视频
    const title = '学习手册-小娄报告';
    return {
      bookList,
      recommendBook,
      recommendBlog,
      recommendVideo,
      title,
    };
  }

  async getSectionDetail(id) { // 电子书详情 -- 待完善，获取目录
    const section = await this.ctx.service.section.getSectionDetail(id); // 通过小节id获取内容
    const menu = await this.ctx.service.section.getMenuBySectionId(id); // 通过书的id获取这本书的章节目录
    const bookList = await this.ctx.service.book.getBookList({ page: 1, total: 100 }); // 获取所有书籍
    return {
      section,
      bookList,
      menu,
      title: section.title + '-小娄报告',
    };
  }

  async getBlogList(query) { // 博客列表
    const blog = await this.ctx.service.blog.getBlogList(query); // 通过query方法获取博客的所有数据
    const recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 }); // 推荐博客
    const recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 3 }); // 推荐书
    const title = '博客-小娄报告'; // 标题
    return {
      blog,
      recommendBook,
      recommendBlog,
      title,
    };
  }

  async getBlogDetail(id) { // 博客详情
    const blog = await this.ctx.service.blog.getBlogDetail(id); // 查看一篇博客
    const recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 3 }); // 推荐书
    const recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 }); // 推荐博客
    const title = blog.title + '-小娄报告'; // 标题
    return {
      blog,
      recommendBook,
      recommendBlog,
      title,
    };
  }


  async getResourceList(query) { // 下载列表
    const resourceList = await this.ctx.service.resource.getResourceList(query); // 获取所有资源
    const recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 1 }); // 推荐书
    const recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 }); // 推荐博客
    const title = '资源下载-小娄报告'; // 标题
    return {
      resourceList,
      recommendBook,
      recommendBlog,
      title,
    };
  }


  async getVideoList(key) { // 视频列表
    const videoList = await this.ctx.service.video.getVideoList({ page: 1, total: 100, key }); // 查看所有视频类别以及视频类别所属的视频
    const recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 3 }); // 推荐书
    const recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 }); // 推荐博客
    const recommendVideo = await this.ctx.service.video.getVideoList({ page: 1, total: 3 }); // 推荐一个视频
    const title = '视频-小娄报告'; // 标题名称
    return {
      videoList,
      recommendBook,
      recommendBlog,
      recommendVideo,
      title,
    };
  }

  async getVideoDetail(id) { // 获取视频类别详情
    const video = await this.ctx.service.video.getVideoDetail(id); // 通过视频类别id获取视频类别
    const videoList = await this.ctx.service.video.getVideoList({ page: 1, total: 100 }); // 通过视频类别的id获取这个视频类别的所有视频
    const title = video.title + '-小娄报告';
    return {
      video,
      videoList,
      title,
    };
  }
}

module.exports = WebsitService;
