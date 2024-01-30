import { upsertTodo, validateTodo } from '../models/todos.mjs'

export async function post (req) {

  if (!req.body?.created) {
    req.body.created = new Date().toISOString()
  }

  let { todo } = await validateTodo.create(req)

  const result = await upsertTodo(todo)
  return {
    json: { todo: result },
    location: '/'
  }
}
