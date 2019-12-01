'use strict'

const fs = require('fs')
const path = require('path')

const Router = require('koa-router')
const koaBody = require('koa-body')

const adding = new Router({prefix: '/adding'})

const { authenticateUser } = require('../controllers/middleware/auth')

const UPLOAD_FOLDER = path.join(__dirname, '../public/images')

adding.get('/game', authenticateUser, async ctx => {

	const a = ctx.session.userID
	const user = await ctx.db.getUser(a)
	const platformnames = await ctx.db.getAllPlatforms()
	const categories = await ctx.db.getCategories()
	await ctx.render('addingGames.hbs', {platforms: platformnames, user: ctx.session.userID,
		categories: categories, admin: await ctx.db.isUserAdmin(ctx.session.userID)})

	if(!user) {
		console.log('you are not allowed to add any games')
	}

})

adding.post(
	'/game',
	authenticateUser,
	koaBody({ multipart: true }),
	async ctx => {
		const body = ctx.request.body

		const { poster, splash } = ctx.request.files

		const platforms = await getPlatformsFromBody(ctx.db, body)
		const posterSrc = uploadImageFile(poster)
		const splashSrc = uploadImageFile(splash)

		body.submittedBy = ctx.session.userID
		body.approved = 'no'
		body.platforms = platforms
		body.categories = []
		body.poster = path.basename(posterSrc)
		body.splash = path.basename(splashSrc)

		await ctx.db.createGame(body)
		return ctx.redirect('/adding/game')
	})

/**
 * Gets a list of Platforms from the request body
 * @param {*} db - DbContext for the database
 * @param {*} body - Request body object
 * @returns {Promise<Platform[]>}
 */
async function getPlatformsFromBody(db, body) {
	const platforms = []
	const keys = Object.keys(body).filter(k => k.startsWith('platforms-'))

	for (const key of keys) {
		const id = Number(body[key])
		platforms.push(await db.getPlatform(id))
	}

	return platforms
}

/**
 * Gets the upload name from from a filepath and a type
 * @param {string} filepath - Path of the file
 * @param {string} type - Mimetype of the file
 * @returns {string}
 */
function getUploadName(filepath, type) {
	let name = path.basename(filepath)
	if (type === 'image/jpeg') {
		name += '.jpg'
	} else if (type === 'image/png') {
		name += '.png'
	}
	return name
}

/**
 * Uploads a single file.
 * @param {File} file - File being uploaded
 * @returns {string} Path of uploaded file
 */
function uploadImageFile(file) {
	const filename = path.join(
		UPLOAD_FOLDER,
		getUploadName(file.path, file.type)
	)
	fs.copyFileSync(file.path, filename)
	return filename
}

module.exports = adding
