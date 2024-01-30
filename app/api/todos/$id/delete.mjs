import { deleteTodo } from '../../../models/todos.mjs'

export async function post (req) {
  const id = req.pathParameters?.id

  let todo = await deleteTodo(id)
  return {
    json: { todo },
    location: '/'
  }
}
