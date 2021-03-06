/**
 * Creates a common Koa app
 */

'use strict'

const path = require('path')

const Koa = require('koa')
const Views = require('koa-views')
const serve = require('./controllers/middleware/serve')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')

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
app.use(session({key: 'session_id', renew: true}, app))

const SECRET_KEY = process.env.SECRET_KEY || 'dummy'
app.keys = [SECRET_KEY]

// middleware
app.use(handlebars)
// uses ./controllers/middleware/serve.js middleware
app.use(serve({
	folder: path.join(__dirname, 'public'),
	base: '/public/'
}))
app.use(bodyParser())
app.use(session({key: 'session_id', renew: true}, app))

// db stuff
const db = require('./db')
const dbcontext = new db.SqliteDbContext(path.join(__dirname, 'app.db'))

// inject the db context
app.context.db = dbcontext

const login = require('./controllers/login')
const home = require('./controllers/home')
const logout = require('./controllers/logout')
const game = require('./controllers/game')
const homepage = require('./controllers/homepage')
const signup = require('./controllers/signup')
const list = require('./controllers/list')
const approval = require('./controllers/approval')
const adding = require('./controllers/adding')

app.use(handlebars)
app.use(game.routes())
app.use(login.routes())
app.use(list.routes())
app.use(approval.routes())
app.use(logout.routes())
app.use(adding.routes())
app.use(homepage.routes())
app.use(signup.routes())
app.use(home.routes())

module.exports = app

