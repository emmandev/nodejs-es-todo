const mysql = require("mysql")

let config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}

const db = mysql.createConnection(config)

db.connect((err) => {
  if (err) {
    throw err
  }
})

module.exports = db
