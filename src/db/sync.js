// 初始化数据库表
const seq = require('./seq');

// 引入数据模型入口文件
require('./model/index');

// 测试连接
seq
  .authenticate()
  .then(() => {
    console.log('auth ok');
  })
  .catch(() => {
    console.log('auth err');
  });

// 执行同步   force: true--每次同步都会重新建表，如果不用重新建表，删除即可
seq.sync({ force: true }).then(() => {
  console.log('sync ok');
  process.exit();
});
