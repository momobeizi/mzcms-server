/*
 * @Description: 连接 redis 的方法 get set
 * @Author: 王振
 * @Date: 2021-07-09 10:25:11
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-09 10:25:32
 */

const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', (err) => {
  console.error('redis error', err);
});

/**
 * redis redisSet
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间，单位 s默认4个小时
 */
function redisSet(key, val, timeout = 60 * 60 * 4) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val);
  redisClient.expire(key, timeout);
}

/**
 * redis redisGet
 * @param {string} key 键
 */
function redisGet(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val == null) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(val));
      } catch (ex) {
        resolve(val);
      }
    });
  });
  return promise;
}

module.exports = {
  redisSet,
  redisGet,
};
