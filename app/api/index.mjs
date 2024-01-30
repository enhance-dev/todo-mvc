import { getTodos } from '../models/todos.mjs'

export async function get (req) {
  let todos = await getTodos()
  let active = todos.filter(todo => !todo.completed)
  let completed = todos.filter(todo => todo.completed)

  const filter = req.query.filter
  if (filter==='active') todos = active
  if (filter==='completed') todos = completed

  return {
    json: { todos, active, completed, filter }
  }
}

