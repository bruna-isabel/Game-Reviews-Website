/*
 * Database controller
 */

const sqlite = require('sqlite')

const User = require('./models/user')

class DbContext {
  async getUsers() { }
  async getUser(id) { }
  async deleteUser(id) { }
  async createUser(user) { }
  async updateUser(user) { }

  async execute(query) { }
}

class SqliteDbContext extends DbContext {
  constructor(filename) {
    super()

    this.sqlitePromise = sqlite.open(filename, { Promise })
  }

  async getUser(id) {
    const sqlite = await this.sqlitePromise

    let query

    if (typeof id === 'number') {
      query = 'SELECT * FROM `users` WHERE `id` = ?;'
    } else if (typeof id === 'string') {
      query = 'SELECT * FROM `users` WHERE `username` = ?;'
    } else {
      throw new TypeError('id must be number or string')
    }

    const user = await sqlite.get(query, id)
    return Object.assign(new User(), user)
  }

  async getUsers() {
    const sqlite = await this.sqlitePromise

    const users = await sqlite.all('SELECT * FROM `users`;')
    return users.map(x => Object.assign(new User(), x))
  }

  async deleteUser(id) {
    const sqlite = await this.sqlitePromise

    let query

    if (typeof id === 'number') {
      query = 'DELETE FROM `users` WHERE `id` = ?;'
    } else if (typeof id === 'string') {
      query = 'DELETE FROM `users` WHERE `username` = ?;'
    } else {
      throw new TypeError('id must be number or string')
    }

    await sqlite.run(query, id)
  }

  async createUser(user) {
    const sqlite = await this.sqlitePromise

    const { lastID } = await sqlite.run(
      'INSERT INTO `users` (`username`, `hash`) VALUES (?, ?);',
      user.username,
      user.hash
    )
    return this.getUser(lastID)
  }

  async updateUser(user) {
    const sqlite = await this.sqlitePromise

    await sqlite.run(
      'UPDATE `users` SET `username` = ?, `hash` = ? WHERE `id` = ?;',
      user.username,
      user.hash,
      user.id
    )
    return this.getUser(user.id)
  }
}

module.exports = {
  DbContext,
  SqliteDbContext
}
