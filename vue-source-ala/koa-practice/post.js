const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

// 使用ctx.body解析中间件
app.use(bodyParser())

app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
     // 当GET请求时候返回表单页面
     let html = `
     <h1>koa2 request post demo</h1>
     <form method="POST" action="/">
       <p>userName</p>
       <input name="userName" /><br/>
       <p>nickName</p>
       <input name="nickName" /><br/>
       <p>email</p>
       <input name="email" /><br/>
       <button type="submit">submit</button>
     </form>
   `
   ctx.body = html
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    // 自我实现的post解析
    // let postData = await parsePostData(ctx)

    // bodyParser
    let postData = ctx.request.body
    ctx.body = postData
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }
})

function parsePostData (ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = ''
      ctx.req.addListener('data', (data) =>  {
        postdata += data
      }) 
      ctx.req.addListener("end",function(){
        let parseData = parseQueryStr( postdata )
        resolve( parseData )
      })
    } catch (error) {
      reject()
    }
  })
}

function parseQueryStr (queryStr ) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  for (  let [ index, queryStr ] of queryStrList.entries()  ) {
    let itemList = queryStr.split('=')
    queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
  }
  return queryData
}

app.listen(3000, () => {
  console.log('[demo] start-quick is starting at port 3000')
})