import { upsertTodo, validateTodo } from '../../models/todos.mjs'

export async function post(req) {
  const id = req.pathParameters?.id

  const toggle = Object.prototype.hasOwnProperty.call(req.query, 'toggle')
  const body = { ...req.body }
  body.completed = toggle ? !body.completed : body.completed

  let { todo } = await validateTodo.update({ ...req, body })

  const result = await upsertTodo({ key: id, ...todo })
  return {
    json: { todo: result },
    location: '/'
  }
}
