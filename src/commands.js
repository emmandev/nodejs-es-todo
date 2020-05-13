/*
 * Command handlers
 */

const { v4: uuid } = require("uuid")
const model = require("./dto")
const eventStore = require("./event-store")

const addTodo = (params) => {
  const id = uuid()
  const todo = { id, ...params }
  const event = model.createTodo(todo)

  eventStore.init(event)

  return todo
}

const deleteTodo = (params) => {
  const event = model.deleteTodo(params.id)

  const todo = eventStore.add(event)

  return todo
}

const updateTodo = (params) => {
  const event = model.updateTodo(params.id, params)

  const todo = eventStore.add(event)

  return todo
}

module.exports = { addTodo, deleteTodo, updateTodo }
