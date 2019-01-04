const Koa = require('koa')
const fs = require('fs')
const loggerAsync  = require('./middleware/logger-async')
const app = new Koa()

app.use(loggerAsync())
// app.use(async (ctx) => {
//   ctx.body = 'hello body'
// })

function render (page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `./view/${page}`
    fs.readFile(viewUrl, "binary", (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * 
 * 
*/
async function router (url) {
  let view = '404.html'
  switch (url) {
    case '/': 
      view = 'index.html'
      break
      case '/index':
      view = 'index.html'
      break
    case '/todo':
      view = 'todo.html'
      break
    case '/404':
      view = '404.html'
      break
    default:
      break
  }

  const html = await render(view)
  return html
}

app.use( async ( ctx ) => {
  let url = ctx.request.url
  let html = await router( url )
  ctx.body = html
})

app.listen(3000)

console.log('[demo] start-quick is starting at port 3000')


