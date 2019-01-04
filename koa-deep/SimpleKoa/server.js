const SimpleKoa = require('./index');

const app = new SimpleKoa();
const PORT = 3001;

app.use(async (ctx, next) => {
  console.log('1')
  ctx.body = '<p>this is a body1</p>';
  await next ()
  console.log('4')
});

app.use(async (ctx, next) => {
  console.log('2')
  ctx.body = '<p>this is a body2</p>';
  await next ()
  console.log('3')
});

app.listen(PORT, () => {
  console.log(`the web server is starting at port ${PORT}`);
});
