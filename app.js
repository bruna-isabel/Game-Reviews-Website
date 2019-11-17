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
<<<<<<< HEAD
const list = require ('./controllers/listrouter') 

app.use(handlebars)
app.use(login.routes())
app.use(list.routes()) 
=======
const list = require('./controllers/list')
const approval = require('./controllers/approval')

app.use(handlebars)
app.use(login.routes())
app.use(list.routes())
app.use(approval.routes())

>>>>>>> b90ac833d5a91be9b4babcc4740b6812fcc1f86a
module.exports = app
