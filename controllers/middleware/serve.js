'use strict'

const fs = require('fs')
const path = require('path')

const { getMimeType } = require('../../utils/mime')

/**
 * Options for serve.
 * @typedef ServeOpts
 * @type {object}
 * @property {string} base - Base URL of the static content
 * @property {string} folder - Folder of the static content being served
 */

/**
 * Koa middleware for serving static content.
 * @param {ServeOpts} opts
 * @returns {function} Returns a Koa middleware function
 */
function serve(opts) {
	opts.base = opts.base || '/'
	opts.folder = opts.folder || './static'

	return (ctx, next) => {
		const basePos = ctx.request.url.indexOf(opts.base)
		if (basePos >= 0) {
			let filename = ctx.request.url.slice(basePos + opts.base.length)

			// default to index.html
			if (!filename) {
				filename = 'index.html'
			}

			serveFile(ctx, path.join(opts.folder, filename))
		}

		return next()
	}
}

/**
 * Serves a file via Koa.
 * @param {*} ctx - Koa context object
 * @param {string} filename - filename of the file being served
 */
function serveFile(ctx, filename) {
	console.log(filename, getMimeType(filename))
	ctx.set('Content-Type', getMimeType(filename))
	ctx.body = fs.readFileSync(filename, 'utf8')
}

module.exports = serve
