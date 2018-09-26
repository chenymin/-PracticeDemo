const Koa = require('koa')
let app = new Koa()
/**
 * 不直接提供中间件
 * 通过间接方式提供了中间件，最常见的是间接中间件和子中间件
 * 间接被 app.use() 加载
 * 其他方式接入Koa切面
 * @param {*} path 
 * @param {*} middleware 
 */
function indirectMiddleware (path, middleware) {
  return async function (ctx, next) {
    if (ctx.path === path) {
      await middleware(ctx, next)
    } else {
      await next()
    }
  }
}

const index = async function(ctx, next) {
  ctx.body = 'this is index page';
};

const hello = async function(ctx, next) {
  ctx.body = 'this is hello page';
};

const world = async function(ctx, next) {
  ctx.body = 'this is world page';
};


app.use(indirectMiddleware('/', index));
app.use(indirectMiddleware('/hello', hello));
app.use(indirectMiddleware('/world', world));

app.listen(3001, () => {
  console.log('the demo is start at port 3001');
});