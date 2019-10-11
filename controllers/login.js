
const Router = require('koa-router')
const koaBody = require('koa-body')
const bcrypt = require('bcrypt')

const login = new Router({ prefix: '/login' })

login.use(koaBody())

login.get('/', async ctx => {
  return ctx.render('login.hbs')
})

login.post('/', async ctx => {
  const { username, password } = ctx.request.body

  const user = await ctx.db.getUser(username)
  if (!user) {
    return ctx.render('login.hbs', { errorMsg: 'User does not exist' })
  }

  if (await bcrypt.compare(password, user.hash)) {
    return ctx.redirect('/')
  } else {
    return ctx.render('login.hbs', { errorMsg: 'Password incorrect' })
  }
})

module.exports = login
