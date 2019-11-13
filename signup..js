const Router = require ('koa-router')
const koaBody = require ('koa-body')
const bcrypt = require('bcrypt')

const signup = new Router ({prefix: '/signup'})

login.use(koaBody())

login.get('/',async ctx => { 
  return ctx.render ('signup.hbs')
})

signup.post('/' , async ctx => {
  const {username, email , psw , pswRepeat} =  ctx.request.body
  if (!Validate(username)) {
    return ctx.render('signup ')
  }









})
