import { upsertTodo, getTodos } from '../../models/todos.mjs'

export async function post (req) {

  let todos = await getTodos()
  let active = todos.filter(todo=>!todo.completed)
  let completed = todos.filter(todo=>todo.completed)

  if (active.length > 0) {
    await Promise.all(active.map(todo=>upsertTodo({...todo, completed: true})))
  } else {
    await Promise.all(completed.map(todo=>upsertTodo({...todo, completed: false})))
  }

  todos = await getTodos()
  active = todos.filter(todo => !todo.completed)
  completed = todos.filter(todo => todo.completed)

  return {
    json: { todos, active, completed },
    location: '/'
  }
}
