// 递归当i === array.length 这时就是程序的出口 
function compose(middleware) {
  if (!Array.isArray(middleware)) {
    throw new TypeError('Middleware stack must be an array!');
  }

  return function (ctx, next) {
    let index = -1;

    return dispatch(0);

    function dispatch(i) {
      if (i < index) {
        return Promise.reject(new Error('next() called multiple times'));
      }
      index = i;

      let fn = middleware[i];

      if (i === middleware.length) {
        fn = next;
      }

      if (!fn) {
        return Promise.resolve(); // 中间件这是比较重要的一句话，我的理解就是表示第三await执行完毕，唤醒倒数第二个执行，依次保证执行完成
      }

      try {
        return Promise.resolve(fn(ctx, () => {
          return dispatch(i + 1);
        }));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}

module.exports = compose