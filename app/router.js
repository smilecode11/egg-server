'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;
  router.get('/', controller.home.index);

  router.get('/getList', controller.testSearchSelectList.getList);

  router.get('/getKeyVal',controller.testSearchSelectList.getKeyVal)

  router.get('/test/get', controller.test.get);
};
