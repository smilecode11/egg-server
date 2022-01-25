'use strict';

const qs = require('qs');
const parseData = qs.parse('a=2&b=3');
const stringData = qs.stringify({ a: 11, b: 33 });

const Controller = require('egg').Controller;
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      parseData,
      stringData,
    };
  }
}

module.exports = HomeController;
