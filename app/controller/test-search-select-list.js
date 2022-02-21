'use strict';

const Controller = require('egg').Controller;

class TestSearchSelectListController extends Controller {
  /** 获取列表*/
  async getList() {
    const {
      ctx,
    } = this;
    const {
      pageSize = 10, currentPage = 1, keyword = '',
    } = ctx.query || {};

    let listResult = [],
      totalResult = 0,
      code = 0,
      msg = '请求成功';
    try {
      const {
        list,
        total
      } = await ctx.service.testSearchSelectList.getList({
        keyword,
        currentPage,
        pageSize
      });
      listResult = list;
      totalResult = total;
    } catch (error) {
      msg = '服务器异常';
      code = 1;
    } finally {
      // 查询列表数据
      ctx.body = {
        code,
        data: {
          total: totalResult,
          list: listResult,
        },
        msg,
      };
    }
  }

  /** 获取 keyvalue 列表*/
  async getKeyVal() {
    const {
      ctx
    } = this;

    const {
      data
    } = await ctx.service.testSearchSelectList.getKeyVal()

    ctx.body = {
      code: 0,
      data
    }

  }
}

module.exports = TestSearchSelectListController;