/**
 * Creates a common Koa app
 */

'use strict'

const path = require('path')

const Koa = require('koa')
const Views = require('koa-views')
const serve = require('koa-static')
const session = require('koa-session')

const app = new Koa()
const handlebars = new Views(
	path.join(__dirname, '/views'),
	{
		map: { hbs: 'handlebars' },
		extension: 'hbs'
	}
)

const SECRET_KEY = process.env.SECRET_KEY || 'dummy'
app.keys = [SECRET_KEY]


// middleware
app.use(handlebars)
// app.use(serve(path.join(__dirname, 'public')))
app.use(session({key: 'session_id', renew: true}, app))

// db stuff
const db = require('./db')
const dbcontext = new db.SqliteDbContext(path.join(__dirname, 'app.db'))

// inject the db context
app.context.db = dbcontext

const home = require('./controllers/home')
const login = require('./controllers/login')
const logout = require('./controllers/logout')
const signup = require('./controllers/signup')
const homepage = require('./controllers/homepage')
const games = require('./controllers/games')

app.use(handlebars)
app.use(games.routes())
app.use(login.routes())
app.use(logout.routes())
app.use(signup.routes())
app.use(homepage.routes())
app.use(serve(path.join(__dirname, './public')))



module.exports = app
