const createTodo = (params) => {
  return {
    id: params.id,
    event: "TodoAdded",
    type: "Todo",
    payload: { ...params },
  }
}

const deleteTodo = (id) => {
  return {
    id: id,
    event: "TodoDeleted",
    type: "Todo",
    payload: {},
  }
}

const updateTodo = (id, payload) => {
  return {
    id: id,
    event: "TodoUpdated",
    type: "Todo",
    payload: payload,
  }
}

module.exports = { createTodo, deleteTodo, updateTodo }
