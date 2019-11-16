#!/usr/bin/env node

'use strict'

const path = require('path')

const db = require('./db')

const dbcontext = new db.SqliteDbContext(path.join(__dirname, 'app.db'))

const app = require('./app')

const Router = require('koa-router')
const router = new Router()
const views = require('koa-views')
app.use(require('koa-static')('public'))
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
const sqlite = require('sqlite-async')

router.get('/game', async ctx => await ctx.render('GameReviewTestTLOU'))

router.post('/add', async ctx => {
	try {
		const body = ctx.request.body
		const db = await sqlite.open('./reviews.db')
		var d = new Date();
		var month = Number(d.getMonth()+1)
		var currentDate = "" + d.getDate() + '/' + month + '/' + d.getFullYear() + "";
		await db.run( `INSERT INTO reviews(user, game, review_score, review_text, review_date) VALUES("USER_NAME", "${body.gameName}", "${body.starRating}", "${body.rvtext}", "${currentDate}");`)
		await db.close()
	} catch(err) {
		ctx.redirect(`/?msg=ERROR: ${err.message}`)
	}
})

app.use(router.routes())

// inject the db context
app.context.db = dbcontext

app.listen(8080)

