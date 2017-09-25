const PouchDB = require('pouchdb')
const COUCHDB_URL = process.env.COUCHDB_URL

let db

/**
 * [description]
 * @return {[type]} [description]
 */
const HelloModel = () => Object.assign(this, ({
  getByID: async id => db.get(id),
}))
/**
 * [description]
 * @param  {String} table [description]
 * @return {[type]}       [description]
 * @todo ErrorHandling
 */
HelloModel.create = ( table = 'hello' ) => {
  db = new PouchDB(`${COUCHDB_URL}/${table}`)
  // db.on('error', err => console.error('Error', err)) // deal with error later
  return HelloModel()
}

module.exports = HelloModel



