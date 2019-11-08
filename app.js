/**
 * Creates a common Koa app
 */

'use strict'

const path = require('path')

const Koa = require('koa')
const Views = require('koa-views')
const serve = require('koa-static')

const app = new Koa()
const handlebars = new Views(
	path.join(__dirname, '/views'),
	{
		map: { hbs: 'handlebars' },
		extension: 'hbs'
	}
)

const login = require('./controllers/login')
const homepage = require('./controllers/homepage')

app.use(handlebars)
app.use(login.routes())
app.use(homepage.routes())
app.use(serve(path.join(__dirname, './public')))

module.exports = app
