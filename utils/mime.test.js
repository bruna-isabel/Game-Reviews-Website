'use strict'

const { getMimeType } = require('./mime')

test('should get mimetype from file extension', () => {
	const testFiles = {
		'test.png': 'image/png',
		'test.jpg': 'image/jpeg',
		'test.jpeg': 'image/jpeg',
		'test.svg': 'image/svg+xml',
		'test.svgz': 'image/svg+xml',
		'test.gif': 'image/gif',
		'test.webp': 'image/webp',
		'test.webm': 'video/webm',
		'test.mov': 'video/quicktime',
		'test.mp4': 'video/mp4',
		'test.ogg': 'audio/ogg',
		'test.mp3': 'audio/mpeg',
		'test.js': 'application/javascript',
		'test.css': 'text/css',
		'test.txt': 'text/plain',
		'test.html': 'text/html',
		'test.htm': 'text/html',
		'test.exe': 'application/octet-stream',
		'test.bin': 'application/octet-stream',
		'test.xyz': null
	}

	for (const file in testFiles) {
		expect(getMimeType(file)).toEqual(testFiles[file])
	}
})
