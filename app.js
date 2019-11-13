/**
 * Creates a common Koa app
 */

'use strict'

const path = require('path')

const Koa = require('koa')
const Views = require('koa-views')

const app = new Koa()
const handlebars = new Views(
	path.join(__dirname, '/views'),
	{
		map: { hbs: 'handlebars' },
		extension: 'hbs'
	}
)

const login = require('./controllers/login')
const list = require ('./controllers/listrouter') 

app.use(handlebars)
app.use(login.routes())
app.use(list.routes()) 
module.exports = app
