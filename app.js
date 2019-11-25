/**
 * Creates a common Koa app
 */

'use strict'

const path = require('path')

const Koa = require('koa')
const Views = require('koa-views')
const serve = require('./controllers/middleware/serve')
const session = require('koa-session')

const app = new Koa()
const handlebars = new Views(
	path.join(__dirname, '/views'),
	{
		map: { hbs: 'handlebars' },
		extension: 'hbs',
		options: {
			partials: {
				navbar: `${__dirname}/views/partials/navbar.hbs`
			}
		}
	}
)

const SECRET_KEY = process.env.SECRET_KEY || 'dummy'
app.keys = [SECRET_KEY]

// middleware
app.use(handlebars)
// uses ./controllers/middleware/serve.js middleware
app.use(serve({
	folder: path.join(__dirname, 'public'),
	base: '/public/'
}))
app.use(session({key: 'session_id', renew: true}, app))

// db stuff
const db = require('./db')
const dbcontext = new db.SqliteDbContext(path.join(__dirname, 'app.db'))

// inject the db context
app.context.db = dbcontext

const home = require('./controllers/home')
const login = require('./controllers/login')
const logout = require('./controllers/logout')
const homepage = require('./controllers/homepage')

// routers
app.use(home.routes())
app.use(login.routes())
app.use(logout.routes())
app.use(homepage.routes())

module.exports = app
