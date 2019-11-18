#!/usr/bin/env node

'use strict'

const path = require('path')
const db = require('./db')
const dbcontext = new db.SqliteDbContext(path.join(__dirname, 'app.db'))

const app = require('./app')
const handlebars = require('koa-hbs-renderer')
const Router = require('koa-router')
const router = new Router()
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const Database = require('sqlite-async')

app.use(require('koa-static')('public'))
app.use(bodyParser())
app.use(handlebars({ paths: { views: `${__dirname}/views` } }))
app.use(router.routes())
app.use(bodyParser())

router.get('/game:id', async ctx => {
	try {
		console.log(ctx.params.id)
		const sql = `SELECT * FROM games WHERE id = ${ctx.params.id};`
		const db = await Database.open('./gamesExample.db')
		const data = await db.all(sql)
		await db.close()
		console.log(data)
		await ctx.render('GameReviewTestTLOU', data[0])
	} catch(err) {
		ctx.body = err.message
	}
})

router.post('/add', async ctx => {
	try {
		const body = ctx.request.body
		const db = await Database.open('./reviews.db')
		var d = new Date();
		var month = Number(d.getMonth()+1)
		var currentDate = "" + d.getDate() + '/' + month + '/' + d.getFullYear() + "";
		await db.run(`INSERT INTO reviews(user, game, review_score, review_text, review_date) VALUES("USER_NAME", "${body.gameName}", "${body.starRating}", "${body.rvtext}", "${currentDate}");`)
		await db.close()
		ctx.redirect(`/game`)
	} catch(err) {
		ctx.redirect(`/?msg=ERROR: ${err.message}`)
	}
})

app.use(router.routes())
// inject the db context
app.context.db = dbcontext
app.listen(8080)