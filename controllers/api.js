'use strict'

const Router = require('koa-router')

const apiRouter = new Router({ prefix: '/api' })

import {exports} from '/controllers/router.js'

module.export = apiRouter
