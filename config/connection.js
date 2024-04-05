const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Bookstore',
  password: 'postgres',
  port: 5432,
  idleTimeoutMillis: 500  // stop connect jika sudah idle / diam saja dalam waktu ... ms
})

async function connect () {
  try {
    const test = await pool.query(`SELECT NOW()`)
    console.log(test.rows)
    // await pool.end()  // stop connection jika sudah ga digunakan
  } catch (error) {
    console.log(error)
  }
}

// connect()

module.exports = pool