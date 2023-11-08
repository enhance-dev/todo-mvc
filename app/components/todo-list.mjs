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
    <style>

    .todo-list li .toggle + button {
      background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
      background-repeat: no-repeat;
      background-position: center left;
    }
    .todo-list li .toggle:checked + button {
      background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E');
    }
    .todo-list li button {
      overflow-wrap: break-word;
      padding: 15px 15px 15px 60px;
      display: block;
      line-height: 1.2;
      transition: color 0.4s;
      font-weight: 400;
      color: #484848;
    }
    button.edit-task.edit-task {
      display: none;
    }

    </style>
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
