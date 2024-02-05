/* globals customElements */
import enhance from '@enhance/element'
import API from '../browser/api.mjs'
const api = API()

const todoHeader ={
  api,
  init(element){
    element.api = api
  },
  connected(){
    this.form = this.querySelector('form')
    this.addNewTask = this.addNewTask.bind(this)
    this.form.addEventListener('submit', this.addNewTask)
  },

  disconnected() {
    this.form.removeEventListener('submit', this.addNewTask)
  },

  addNewTask(event){
    event.preventDefault()
    this.api.create(this.form)
    this.form.reset()
  },

  render({html}){
    return html`
  <header class="header">
    <h1>todos</h1>
    <form action="/todos" method="POST">
      <input autofocus="autofocus" autocomplete="off" placeholder="What needs to be done?" name="task" class="new-todo">
    </form>
  </header>
    `
  }
}

enhance('todo-header', todoHeader)
export default todoHeader
