'use strict'

const fs = require('fs')

async function runSQLScript(db, filename) {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, 'utf8', async(err, sql) => {
			if (err) {
				return reject(err)
			}
			resolve(db.exec(sql))
		})
	})
}

module.exports = {
	runSQLScript
}
