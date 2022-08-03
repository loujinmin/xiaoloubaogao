'use strict';

const Service = require('egg').Service;

class BlogService extends Service {
  // 添加博客
  async createBlog({
    title,
    img,
    md_text,
    html_text,
  }) {
    try {
      await this.app.model.Blog.create({
        title,
        img,
        md_text,
        html_text,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // 删除博客
  async deleteBlog(id) {
    try {
      await this.app.model.Blog.destroy({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // 修改博客
  async updateBlog(
    id, {
      title,
      img,
      md_text,
      html_text,
    }) {
    try {
      await this.app.model.Blog.update({
        title,
        img,
        md_text,
        html_text,
      }, {
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  // 通过query查询条件查询博客列表
  async getBlogList(query) {
    try {
      const number = parseInt(query.page);
      const start = number * 10 - 10;
      const degree = parseInt(query.total);

      let blogList = null;
      const Sequelize = require('sequelize');
      const Op = Sequelize.Op;
      const key = query.key;
      if (!key) {
        blogList = await this.app.model.Blog.findAll({
          limit: [ start, degree ],
        });
      } else {
        blogList = await this.app.model.Blog.findAll({
          limit: [ start, degree ],
          raw: true,
          order: [
            [ 'title', 'DESC' ],
          ], // 排序
          where: {
            // name: 'cheny', // 精确查询
            title: {
              // 模糊查询
              [Op.like]: '%' + key + '%',
            },
          },
        });
      }

      return blogList;
    } catch (error) {
      return error;
    }
  }

  // 查一篇博客
  async getBlogDetail(id) {
    try {
      const blog = await this.app.model.Blog.findOne({
        where: {
          id,
        },
      });
      return blog;
    } catch (error) {
      return null;
    }
  }
}

module.exports = BlogService;
