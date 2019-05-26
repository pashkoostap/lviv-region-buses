const Router = require('koa-router');
const vehicles = new Router();

vehicles.get('/:id', (ctx, next) => {
  ctx.body = '/vehicles/id';
});

module.exports = vehicles;
