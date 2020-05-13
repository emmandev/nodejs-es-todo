const db = require("./db")

// Adds an event
const add = (data) => {
  db.beginTransaction((error) => {
    if (error) {
      throw error
    }

    db.query(
      "SELECT * FROM aggregates WHERE id = ?",
      [data.id],
      (error, results, fields) => {
        if (error) {
          return db.rollback(() => {
            throw error
          })
        }

        if (!results.length) {
          throw "No results found."
        }

        insertEvent(data)
      }
    )
  })
}

// Fetch events based on aggregate id
const fetchById = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM events WHERE aggregate_id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          throw error
        }
        resolve(results)
      }
    )
  })
}

// Fetch events based on aggregate type
const fetchByType = async (type) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM events LEFT JOIN aggregates ON aggregates.id = events.aggregate_id WHERE aggregates.type = ? ",
      [type],
      (error, results, fields) => {
        if (error) {
          throw error
        }
        resolve(results)
      }
    )
  })
}

// Creates an aggregate and an initialization event
const init = (data) => {
  db.beginTransaction((error) => {
    if (error) {
      throw error
    }

    db.query(
      "INSERT INTO aggregates (id, type) VALUES (?, ?)",
      [data.id, data.type],
      (error, results, fields) => {
        if (error) {
          return db.rollback(() => {
            throw error
          })
        }

        insertEvent(data)
      }
    )
  })
}

const insertEvent = (data) => {
  db.query(
    "INSERT INTO events (aggregate_id, event, payload) VALUES (?, ?, ?)",
    [data.id, data.event, JSON.stringify(data.payload)],
    (error, results, fields) => {
      if (error) {
        return db.rollback(() => {
          throw error
        })
      }

      db.commit((error) => {
        if (error) {
          return db.rollback(() => {
            throw error
          })
        }
      })
    }
  )
}

module.exports = { add, fetchById, fetchByType, init }
