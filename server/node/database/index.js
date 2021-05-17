const { Pool } = require('pg')

/*
  About pool.query():
    This is the preferred way to query with node-postgres
    if you can as it removes the risk of leaking a client.
    https://node-postgres.com/features/pooling
*/
const pool = new Pool()

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
