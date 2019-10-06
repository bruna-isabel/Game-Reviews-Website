
const Router = require('koa-router')

const login = new Router({ prefix: '/login' })

login.get('/', async ctx => {
  await ctx.render('login.hbs')
})

login.post('/', async ctx => {
  console.log(ctx.query)
  console.log(ctx.querystring)
})

module.exports = login
