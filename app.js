/**
 * Creates a common Koa app
 */

'use strict'

const path = require('path')

const Koa = require('koa')
const Views = require('koa-views')
const serve = require('koa-static')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const handlebars = new Views(
	path.join(__dirname, '/views'),
	{
		map: { hbs: 'handlebars' },
		extension: 'hbs'
	}
)
app.use(session({key: 'session_id', renew: true}, app))

const list = require('./controllers/list')
const approval = require('./controllers/approval')
const adding = require('./controllers/adding')

<<<<<<< HEAD
app.use(require('koa-static')('public'))
=======
>>>>>>> feature/game-addition
const SECRET_KEY = process.env.SECRET_KEY || 'dummy'
app.keys = [SECRET_KEY]

// middleware
app.use(handlebars)
app.use(bodyParser())
// app.use(serve(path.join(__dirname, 'public')))
app.use(session({key: 'session_id', renew: true}, app))

// db stuff
const db = require('./db')
const dbcontext = new db.SqliteDbContext(path.join(__dirname, 'app.db'))

// inject the db context
app.context.db = dbcontext

const login = require('./controllers/login')
const list = require('./controllers/list')
const approval = require('./controllers/approval')
const home = require('./controllers/home')
const logout = require('./controllers/logout')
const game = require('./controllers/game')

// routers
app.use(home.routes())
app.use(login.routes())
app.use(list.routes())
app.use(approval.routes())
app.use(logout.routes())
<<<<<<< HEAD
app.use(game.routes())
=======
app.use(adding.routes())
>>>>>>> feature/game-addition

module.exports = app
