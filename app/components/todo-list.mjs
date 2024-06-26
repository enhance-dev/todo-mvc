/* globals customElements */
import CustomElement from '@enhance/custom-element'
import API from '../browser/api.mjs'
const api = API()


export default class TodoList extends CustomElement  {
  constructor(){
    super()
    this.api = api
  }

  connectedCallback(){
    this.update = this.update.bind(this)
    this.toggle = this.toggle.bind(this)
    this.section = this.querySelector('section')
    this.list = this.querySelector('ul.todo-list')
    this.toggleBtn = this.querySelector('button.toggle-all')
    this.api.subscribe(this.update,['todos', 'filter'])
    this.toggleBtn.addEventListener('click', this.toggle)
  }

  disconnectedCallback(){
    this.toggleBtn.removeEventListener('click', this.toggle)
  }

  update(){
    let filter = this.api.store.filter
    this.section.style.display = this.api.store.todos.length > 0 ? 'block' : 'none'
    let items = filter === 'all' ? this.api.store.todos : this.api.store[filter]
    this.list.innerHTML = items.map(todo => `
      <li id="${todo.key}" >
        <todo-item  class="todo" key="${todo.key}" completed="${todo.completed}" task="${todo.task}"></todo-item>
      </li>
    `).join('')
  }

  toggle(event) {
    event.preventDefault()
    this.api.toggle()
  }

  render({html,state}){
    const { store ={}} = state
    const { todos =[]} = store

    const display = todos.length ? 'block' : 'none'

    const listItems = todos.map(todo => `
      <li id="${todo.key}" >
      <todo-item class="todo" key="${todo.key}" completed="${todo.completed}" task="${todo.task}"></todo-item>
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

customElements.define('todo-list', TodoList)
