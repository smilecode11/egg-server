'use strict';

const qs = require('qs');
const {
  sleep,
} = require('../../util');

const parseData = qs.parse('a=2&b=3');
const stringData = qs.stringify({
  a: 11,
  b: 33,
});

const Controller = require('egg').Controller;
class TestController extends Controller {
  async get() {
    const {
      ctx,
    } = this;

    await sleep(200);

    const n = Math.random();
    // 随机挂掉接口
    if (n > 0.8) {
      ctx.body = {
        parseData,
        stringData,
      };
    } else {
      ctx.status = 404;
      ctx.body = '';
    }

  }
}

module.exports = TestController;
