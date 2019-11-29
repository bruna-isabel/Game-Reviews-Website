#!/usr/bin/env node

'use strict'

const port = 8080

const path = require('path')

const db = require('./db')

const dbcontext = new db.SqliteDbContext(path.join(__dirname, 'app.db'))

const app = require('./app')

<<<<<<< HEAD
// inject the db context
app.context.db = dbcontext

module.exports = app.listen(port, async() => console.log(`listening on port ${port}`))
=======
// eslint-disable-next-line no-magic-numbers
app.listen(8080)
>>>>>>> navbar
