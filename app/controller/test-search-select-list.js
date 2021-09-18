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
    // 查询列表数据
    const listData = await ctx.service.testSearchSelectList.getList({ keyword, currentPage, pageSize });
    // 统计列表数据
    const totalCount = (await ctx.service.testSearchSelectList.countListTotal({ keyword }))[0].count;
    ctx.body = {
      code: 0,
      data: {
        total: totalCount,
        list: listData,
      },
    };
  }
}

module.exports = TestSearchSelectListController;
