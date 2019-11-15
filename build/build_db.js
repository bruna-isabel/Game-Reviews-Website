#!/usr/bin/env node

'use strict'

const path = require('path')

const sqlite = require('sqlite')

const { runSQLScript } = require('./utils')

sqlite.open('app.db').then(async db => {
	const sqlPath = path.join(__dirname, 'build_db.sql')
	await runSQLScript(db, sqlPath)
})
