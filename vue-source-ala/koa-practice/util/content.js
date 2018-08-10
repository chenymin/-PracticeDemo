const path = require('path')
const fs = require('fs')

// 封装读取目录内容方法
const dir = require('./dir')

// 封装读取文件内容方法
const file = require('./file')

/**
 * @param {object} ctx koa 上下文
 * @param {string} 静态资源目录在本地的绝对路径
 * @return {string} 请求获取到的本地内容
*/
async function content(ctx, fullStaticPath) {
  // 封装请求资源的绝对路径
  let reqPath = path.join(fullStaticPath, ctx.url)

  // 判断请求路径是否为存在目录或文件
  let exist = fs.existsSync(reqPath)

  // 返回请求内容，默认为空
  let content = ''

  if (!exist) {
    content = '404 Not Found!'
  } else {
    let stat = fs.statSync(reqPath)

    if (stat.isDirectory()) {
      content = dir(ctx.url, reqPath)
    } else {
      content = file(reqPath)
    }
  }

  return content
}

module.exports = content