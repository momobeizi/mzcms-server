const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

/**
 * 渲染首页
 */
async function renderWebsiteIndex() {
  const templateFilePath = path.join(__dirname, '../../../public/template', 'index.ejs');
  const template = fs.readFileSync(templateFilePath, 'utf-8');
  return ejs.render(template, {
    title: '首页',
    message: '欢迎访问我的网站',
  });
}

module.exports = {
  renderWebsiteIndex,
};
