/* globals customElements */
import enhance from '@enhance/element'
import API from '../browser/api.mjs'
const api = API()

const todoList = {
  api,
  keys: ['todos', 'filter'],
  init(element) {
    element.submit = element.submit.bind(element)
  },

  submit(event) {
    event.preventDefault()
    console.log('submit toggle all')
    this.api.toggle()
  },

  render({html,state}){
    console.log('todo-list render')
    const { store ={}} = state
    const { todos =[], filter='all'} = store

    const display = todos.length ? 'block' : 'none'
    const visibleTodos = filter === 'all' ? todos : store[filter]
    const listItems = visibleTodos.map(todo => `
      <li id="${todo.key}" >
        <todo-item onblur="form.update-todo" class="todo" key="${todo.key}" completed="${todo.completed}" task="${todo.task}"></todo-item>
      </li>
      `).join('')

    return html`
    <section class="main" style="display: ${display};">
      <form action="/todos/toggle" method="POST">
        <button id="toggle-all" type="submit" class="toggle-all"></button>
        <label for="toggle-all">Mark all as complete</label>
      </form>
      <ul class="todo-list">
        ${listItems}
      </ul>
    </section>
    `
  }
}

enhance('todo-list', todoList)
export default todoList
