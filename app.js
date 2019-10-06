/**
 * Creates a common Koa app
 */

// const fs = require('fs')
const path = require('path')

const Koa = require('koa')
const Views = require('koa-views')

// const findPartials = (folder) =>
//   fs.readdirSync(folder)
//     .filter(x => x.endsWith('partial.hbs'))

const app = new Koa()
const viewPath = path.join(__dirname, '/views')
const handlebars = new Views(
  viewPath,
  {
    map: { hbs: 'handlebars' },
    extension: 'hbs',
    options: {
      partials: {
        navbar: 'navbar.partial'
      }
    }
  }
)

const login = require('./controllers/login')

app.use(handlebars)
app.use(login.routes())

module.exports = app
