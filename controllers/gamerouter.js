const Router= require('koa-router')

const gameRouter = new Router ({prefix: '/login'})
gameRouter.get('/', ctx=> ctx.render('login'))

module.exports = gameRouter;

