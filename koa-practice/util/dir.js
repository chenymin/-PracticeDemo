const url = require('url')
const fs = require('fs')
const path = require('path')

// 遍历读取目录内容方法
const walk = require('./walk')

/**
 * @param {string} url 当前请求的上下文中的url，即ctx.url
 * @param {string} reqPath 请求静态资源的完整本地路径
 * @return {string} 返回目录内容,封装成HTML
*/
function dir (url, reqPath) {
  let contentList = walk(reqPath)
  let html = `<ul>`
  for (let [index, item] of contentList.entries()) {
    html = `${html}<li><a href="${url === '/' ? '' : url}/${item}">${item}</a></li>`
  }
  html = `${html}</ul>`
  return html
}

module.exports = dir