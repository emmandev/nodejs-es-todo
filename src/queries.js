const eventStore = require("./event-store")

const fetch = async (id) => {
  const todo = await eventStore.fetchById(id).then((data) => {
    console.log("DATA", data)
    return data.reduce(
      (state, event) => Object.assign(state, JSON.parse(event.payload)),
      {}
    )
  })

  return { todo: todo }
}

const fetchAll = async () => {
  const todos = await eventStore.fetchByType("Todo").then((data) => {
    console.log("DATA", data)
    return data.reduce((state, event) => {
      const root = state[event.aggregate_id] || {}
      state[event.id] = Object.assign(root, JSON.parse(event.payload))
      return state
    }, {})
  })

  return { todos: todos }
}

module.exports = { fetch, fetchAll }
