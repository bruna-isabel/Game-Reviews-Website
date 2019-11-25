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

const defaultServeOpts = {
	base: '/',
	folder: '.'
}

/**
 * Koa middleware for serving static content.
 * @param {ServeOpts} opts
 * @returns {function} Returns a Koa middleware function
 */
// eslint-disable-next-line max-lines-per-function
function serve(opts = defaultServeOpts) {
	opts.base = opts.base || defaultServeOpts.base
	opts.folder = opts.folder || defaultServeOpts.folder

	// eslint-disable-next-line max-lines-per-function
	return (ctx, next) => {
		const basePos = ctx.request.url.indexOf(opts.base)
		if (basePos >= 0) {
			let filename = ctx.request.url.slice(basePos + opts.base.length)

			// default to index.html
			if (!filename) {
				filename = 'index.html'
			}

			let fullpath
			if (path.isAbsolute(opts.folder)) {
				fullpath = path.join(opts.folder, filename)
			} else {
				fullpath = path.join(process.cwd(), opts.folder, filename)
			}

			serveFile(ctx, fullpath)
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
	if (!fs.existsSync(filename)) {
		// eslint-disable-next-line no-magic-numbers
		return ctx.throw(404)
	}

	// get mime or default to octet-stream
	const mime = getMimeType(filename) || 'application/octet-stream'
	ctx.set('Content-Type', mime)
	ctx.body = fs.readFileSync(filename)
}

module.exports = serve
