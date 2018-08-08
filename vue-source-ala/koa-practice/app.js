const Koa = require('koa')
const loggerAsync  = require('./middleware/logger-async')
const app = new Koa()

app.use(loggerAsync())
app.use(async (ctx) => {
  ctx.body = 'hello body'
})

app.listen(3000)

console.log('[demo] start-quick is starting at port 3000')


