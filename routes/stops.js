const Router = require('koa-router');
const stops = new Router();

stops.get('/:id', (ctx, next) => {
  ctx.body = '/stops/id';
});

module.exports = stops;
