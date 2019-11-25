#!/usr/bin/env node

'use strict'

const app = require('./app')

app.use(router.routes())
module.exports = app.listen(port, async() => console.log(`listening on port ${port}`)) 
