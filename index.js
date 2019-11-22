#!/usr/bin/env node

'use strict'
<<<<<<< HEAD

const port = 8080

const path = require('path')

const db = require('./db')

const dbcontext = new db.SqliteDbContext(path.join(__dirname, 'app.db'))

const app = require('./app')

// inject the db context
app.context.db = dbcontext

app.listen(port)
=======
const port = 8080

const app = require('./app')

app.listen(8080)
>>>>>>> feature/game-addition
