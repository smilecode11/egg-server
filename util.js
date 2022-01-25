'use strict';

module.exports = {
  /** 睡眠函数
     * @param time 睡眠时间
     *
     */
  sleep(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  },
};
