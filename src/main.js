const fastify = require("fastify")({
  logger: true,
})
const commands = require("./commands")
const queries = require("./queries")
const path = require("path")
const env = require("dotenv").config({
  path: path.resolve(__dirname, "..", ".env"),
})
console.log(
  "TEST",
  env.parsed,
  path.resolve(__dirname, "..", ".env"),
  process.env.DB_NAME
)
/*
 * Routes
 */

// Delete a todo based on id
fastify.delete("/:id", (req, res) => {
  const data = commands.deleteTodo(req.params)
  res.send({ status: 200, data: data })
})

// Fetch all todos
fastify.get("/", async (req, res) => {
  const todos = await queries.fetchAll()
  res.send({ status: 200, data: todos })
})

// Create a todo
fastify.post("/", (req, res) => {
  const data = commands.addTodo(req.body)
  res.send({ status: 200, data: data })
})

// Update a todo
fastify.put("/:id", (req, res) => {
  const data = commands.updateTodo({ id: req.params.id, ...req.body })
  res.send({ status: 200, data: data })
})

// Fetch a todo by id
fastify.get("/:id", async (req, res) => {
  const todo = await queries.fetch(req.params.id)
  res.send({ status: 200, data: todo })
})

// Starts the server
const bootstrap = async () => {
  try {
    await fastify.listen(3003)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
bootstrap()
