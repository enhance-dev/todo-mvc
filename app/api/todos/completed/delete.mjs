import { deleteTodo, getTodos } from '../../../models/todos.mjs'

export async function post (req) {
  const todos = await getTodos()
  const completed = todos.filter(todo=>todo.completed)
  await Promise.all(completed.map(todo=>deleteTodo(todo.key)))
  return {
    location: '/'
  }
}
