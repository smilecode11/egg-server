/* eslint-disable jsdoc/require-param */
// app/service/user.js
'use strict';

const Service = require('egg').Service;

class TestSearchSelectListService extends Service {

  /** 获取列表*/
  async getList({
    keyword,
    pageSize,
    currentPage,
  }) {
    //  list 数据
    const selectOption = {
      where: {
        name: keyword,
      },
      columns: [ 'id', 'name', 'description', 'en_name' ], //  查询表字段
      orders: [[ 'id', 'DESC' ], [ 'name', 'DESC' ]], //  排序方式
      limit: pageSize - 0,
      offset: (currentPage - 1) * pageSize,
    };
    if (!keyword) delete selectOption.where;
    if (!pageSize) selectOption.limit = 10;
    if (!currentPage) selectOption.offset = 0;
    const sqlStr = `
      SELECT ${selectOption.columns.join(',')}
      FROM  interface_list
      WHERE
        name like '%${keyword}%' or id like '%${keyword}%'
      ORDER BY
        ${(selectOption.orders.reduce((totalA, curr) => { totalA.push(curr.join(' ')); return totalA; }, [])).join(',')}
      LIMIT ${selectOption.limit}
      OFFSET ${selectOption.offset}
    `;
    const listResult = await this.app.mysql.query(sqlStr);

    //  total 数据
    let sqlCount = 'SELECT COUNT(1) AS count FROM interface_list';
    if (keyword) sqlCount += ' where name like "%' + keyword + '%"';
    const totalResult = (await this.app.mysql.query(sqlCount))[0].count;

    return { list: listResult, total: totalResult };
  }

}

module.exports = TestSearchSelectListService;
