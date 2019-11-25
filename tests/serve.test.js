/*
 * Integration test for serve middleware
 */

'use strict'

const fs = require('fs')
const path = require('path')

const request = require('supertest')

const Koa = require('koa')
const Router = require('koa-router')

const serve = require('../controllers/middleware/serve')


describe('serve with default opts', () => {
	/*
	* Default opts set the served folder as '.' and the base URL as '/'
	*/

	const app = new Koa()

	let server

	beforeAll(() => {
		app.use(serve())
		server = app.listen(0)
	})

	afterAll(() => {
		server.close()
	})

	test('should serve app.js', (done) => {
		const filename = path.join(__dirname, '../app.js')
		const contents = fs.readFileSync(filename, 'utf8')

		request(server)
			.get('/app.js')
			.expect(200, contents)
			.expect('Content-Type', 'application/javascript', done)
	})

	test('should serve all examples', (done) => {
		const folder = path.join(__dirname, 'examples/serve/')

		for (const file of fs.readdirSync(folder)) {
			request(server)
				.get(`/tests/examples/serve/${file}`)
				.expect(200, done)
		}
	})

	test('should 404 for nonexistent files', (done) => {
		request(server)
			.get('/this-file-does-not-exist.txt')
			.expect(404, done)
	})

	test('should default application/octet-stream on unknown', (done) => {
		const contents = fs.readFileSync(
			path.join(__dirname, 'examples/serve/example.z3')
		)

		request(server)
			.get('/tests/examples/serve/example.z3')
			.expect(200, contents)
			.expect('Content-Type', 'application/octet-stream', done)
	})

	test('should return correct mimetypes', (done) => {
		const base = '/tests/examples/serve'

		const examples = {
			'example.css': 'text/css',
			'example.gif': 'image/gif',
			'example.html': 'text/html',
			'example.jpeg': 'image/jpeg',
			'example.jpg': 'image/jpeg',
			'example.mp3': 'audio/mpeg',
			'example.pdf': 'application/pdf',
			'example.png': 'image/png',
			'example.svg': 'image/svg+xml',
			'example.txt': 'text/plain',
			'example.webm': 'video/webm',
			'example.z3': 'application/octet-stream'
		}

		for (const file in examples) {
			request(server)
				.get(path.join(base, file))
				.expect(200)
				.expect('Content-Type', examples[file])
		}

		done()
	})
})

describe('serve with different base', () => {
	const app = new Koa()

	let server

	beforeAll(() => {
		const router = new Router()

		router.get('/home', (ctx) => {
			ctx.body = 'hello world'
		})

		router.get('/public/home', (ctx) => {
			ctx.body = 'should come from router'
		})

		router.get('/public/README.md', (ctx) => {
			ctx.body = 'override'
		})

		app.use(router.routes())
		app.use(serve({ base: '/public' }))

		server = app.listen(0)
	})

	afterAll(() => {
		server.close()
	})

	test('should serve app.js', (done) => {
		const filename = path.join(__dirname, '../app.js')
		const contents = fs.readFileSync(filename, 'utf8')

		request(server)
			.get('/public/app.js')
			.expect(200, contents)
			.expect('Content-Type', 'application/javascript', done)
	})

	test('should serve all examples', (done) => {
		const folder = path.join(__dirname, 'examples/serve/')

		for (const file of fs.readdirSync(folder)) {
			request(server)
				.get(`/public/tests/examples/serve/${file}`)
				.expect(200, done)
		}
	})

	test('should 404 for nonexistent files', (done) => {
		request(server)
			.get('/public/this-file-does-not-exist.txt')
			.expect(404, done)
	})

	test('should default application/octet-stream on unknown', (done) => {
		const contents = fs.readFileSync(
			path.join(__dirname, 'examples/serve/example.z3')
		)

		request(server)
			.get('/public/tests/examples/serve/example.z3')
			.expect(200, contents)
			.expect('Content-Type', 'application/octet-stream', done)
	})

	test('should return correct mimetypes', (done) => {
		const base = '/public/tests/examples/serve'

		const examples = {
			'example.css': 'text/css',
			'example.gif': 'image/gif',
			'example.html': 'text/html',
			'example.jpeg': 'image/jpeg',
			'example.jpg': 'image/jpeg',
			'example.mp3': 'audio/mpeg',
			'example.pdf': 'application/pdf',
			'example.png': 'image/png',
			'example.svg': 'image/svg+xml',
			'example.txt': 'text/plain',
			'example.webm': 'video/webm',
			'example.z3': 'application/octet-stream'
		}

		for (const file in examples) {
			request(server)
				.get(path.join(base, file))
				.expect(200)
				.expect('Content-Type', examples[file])
		}

		done()
	})

	test('shouldn\'t serve outside of base', (done) => {
		request(server)
			.get('/home')
			.expect(200, 'hello world')

		request(server)
			.get('/public/home')
			.expect(200, 'should come from router')

		request(server)
			.get('/public/README.md')
			.expect(200, 'override')

		done()
	})
})

describe('should serve different base and folder', () => {
	const app = new Koa()

	let server

	beforeAll(() => {
		app.use(serve({
			base: '/public',
			folder: __dirname
		}))

		server = app.listen(0)
	})

	afterAll(() => {
		server.close()
	})

	test('shouldn\'t serve app.js', (done) => {
		request(server)
			.get('/public/app.js')
			.expect(404, done)
	})

	test('should serve all examples', (done) => {
		const folder = path.join(__dirname, 'examples/serve/')

		for (const file of fs.readdirSync(folder)) {
			request(server)
				.get(`/public/examples/serve/${file}`)
				.expect(200, done)
		}
	})

	test('should 404 for nonexistent files', (done) => {
		request(server)
			.get('/public/this-file-does-not-exist.txt')
			.expect(404, done)
	})

	test('should default application/octet-stream on unknown', (done) => {
		const contents = fs.readFileSync(
			path.join(__dirname, 'examples/serve/example.z3')
		)

		request(server)
			.get('/public/examples/serve/example.z3')
			.expect(200, contents)
			.expect('Content-Type', 'application/octet-stream', done)
	})

	test('should return correct mimetypes', (done) => {
		const base = '/public/examples/serve'

		const examples = {
			'example.css': 'text/css',
			'example.gif': 'image/gif',
			'example.html': 'text/html',
			'example.jpeg': 'image/jpeg',
			'example.jpg': 'image/jpeg',
			'example.mp3': 'audio/mpeg',
			'example.pdf': 'application/pdf',
			'example.png': 'image/png',
			'example.svg': 'image/svg+xml',
			'example.txt': 'text/plain',
			'example.webm': 'video/webm',
			'example.z3': 'application/octet-stream'
		}

		for (const file in examples) {
			request(server)
				.get(path.join(base, file))
				.expect(200)
				.expect('Content-Type', examples[file])
		}

		done()
	})
})
