#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')

const sqlite = require('sqlite')

sqlite.open('app.db').then(db => {
  const sqlPath = path.join(__dirname, 'build_db.sql')
  fs.readFile(sqlPath, 'utf8', async (err, sql) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    await db.exec(sql)
  })
})
