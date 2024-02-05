import enhance from '@enhance/element'
import API from '../browser/api.mjs'
const api = API()

const todoItem =  {
  api,
  init(element){
    element.api = api
  },

  attrs:  ['key', 'completed', 'task' ],

  connected(){
    this.updateForm = this.querySelector('form.update-todo')
    this.completed = this.querySelector('form.update-todo input[name=completed]')
    this.task = this.querySelector('form.update-todo input[name=task]')
    this.update = this.update.bind(this)
    this.setComplete = this.querySelector('button.set-complete')
    this.destroy = this.destroy.bind(this)
    this.revert = this.revert.bind(this)
    this.deleteForm = this.querySelector('form.delete-todo')
    this.updateFormKeyInput = this.querySelector('form.update-todo input[name=key]')
    this.destroyFormKeyInput = this.querySelector('form.delete-todo input[name=key]')
    this.task.addEventListener('blur', this.revert)
    this.deleteForm.addEventListener('submit', this.destroy)
    this.updateForm.addEventListener('submit', this.update)
  },

  disconnected() {
    this.task.removeEventListener('blur', this.revert)
    this.deleteForm.removeEventListener('submit', this.destroy)
    this.updateForm.removeEventListener('submit', this.update)
  },

  destroy(event){
    event.preventDefault()
    this.api.destroy(this.deleteForm)
  },

  revert() {
    this.task.value = this.getAttribute('task')
  },

  update(event){
    event.preventDefault()
    if (event.submitter === this.setComplete) {
      this.completed.checked = !this.completed?.checked
    }
    this.api.update(this.updateForm)
  },

  render({html,state}){
    const { attrs = {} } = state
    const { completed = '', key = '', task = '' } = attrs
    const checked = completed === 'true' ? 'checked' : ''

    return html`
<div class="view">
  <form  action="/todos/${key}" class=" update-todo " method="POST" >
    <button class="edit-task hidden" type=submit >update</button>
    <input class="hidden toggle" name="completed" type="checkbox" ${checked} >
    <button class="set-complete" type=submit formaction="/todos/${key}?toggle" aria-label="toggle complete"></button>
    <input type="text" name="task" value="${task}" class="edit" >
    <input type="hidden" name="key" value="${key}">
  </form>

  <form class="delete-todo" action="/todos/${key}/delete" method="POST" >
    <input type="hidden" name="key" value="${key}">
    <button class="destroy"></button>
  </form>
</div>
  `
  }
}

enhance('todo-item', todoItem) 
export default todoItem
