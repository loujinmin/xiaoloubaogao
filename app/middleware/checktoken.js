// eslint-disable-next-line strict
module.exports = () => {
  return async function(ctx, next) {
    try {
      if (ctx.request.header.token) {
        const token = ctx.request.header.token;
        ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
        ctx.cookies.set('token', token, {
          maxAge: 10 * 1000,
          httpOnly: false,
          overwrite: true,
          signed: false,
        });
        await next();
      } else {
        ctx.body = {
          code: 50000,
          message: '没有权限',
        };
      }
    } catch (err) {
      ctx.body = {
        code: 40000,
        message: '没有权限',
      };
    }

  };
};
