#!/usr/bin/env node

/* all routers for acessing the game pages */
const koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const views = require('koa-views')
const path= require('path')
const fs = require('fs')
const sqlite = require('sqlite')
const login = new Router({ prefix: '/login' })
app.use(require('koa-static')('public'))
const apiRouter = new Router({ prefix: '/api' })

var exports = module.exports = {}

const port = 8080
