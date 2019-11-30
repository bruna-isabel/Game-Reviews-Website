#!/usr/bin/env node

'use strict'

const path = require('path')

const sqlite = require('sqlite')

const { runSQLScript } = require('./utils')

sqlite.open('app.db').then(async db => {
	const buildSQL = path.join(__dirname, 'build_db.sql')
	const dataSQL = path.join(__dirname, 'add_data.sql')
	await runSQLScript(db, buildSQL)
	await runSQLScript(db, dataSQL)
})
