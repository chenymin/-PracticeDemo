const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  if (ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp') {
    let callbackName = ctx.query.callback || 'callback'
    let returnData = {
      success: true,
      data: {
        text: 'this is jsonp api',
        time: new Date().getTime
      }
    }

    // jsonp的script字符串
    let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`
    
    // 用text/javascript,让请求支持跨域获取
    ctx.type = 'text/javascript'

    // 输出jsonp字符串
    ctx.body = jsonpStr
  } else {
    ctx.body = 'hello jsonp'
  }
})

app.listen(3000, () => {
  console.log('[demo] jsonp is starting at port 3000')
})