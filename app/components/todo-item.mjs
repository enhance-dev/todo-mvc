/* globals customElements */
import CustomElement from '@enhance/custom-element'
import MorphdomMixin from '@enhance/morphdom-mixin'
import API from '../browser/api.mjs'
const api = API()


export default class TodoItem extends MorphdomMixin(CustomElement)  {
  constructor(){
    super()
    this.api = api
  }

  static get observedAttributes() {
    return ['key', 'completed', 'task' ]
  }

  connectedCallback(){
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
  }

  disconnectedCallback() {
    this.task.removeEventListener('blur', this.revert)
    this.deleteForm.removeEventListener('submit', this.destroy)
    this.updateForm.removeEventListener('submit', this.update)
  }

  destroy(event){
    event.preventDefault()
    this.api.destroy(this.deleteForm)
  }

  revert() {
    this.task.value = this.getAttribute('task')
  }

  update(event){
    event.preventDefault()
    if (event.submitter === this.setComplete) {
      this.completed.checked = !this.completed?.checked
    }
    this.api.update(this.updateForm)
  }

  render({html,state}){
    const { attrs = {} } = state
    const { completed = '', key = '', task = '' } = attrs
    const checked = completed === 'true' ? 'checked' : ''

    return html`
<style>
.view {
  display:grid;
  grid-direction:row;
  grid-template-columns: 1fr 50px;
}
form.update-todo {
  display:grid;
  grid-direction:row;
  grid-template-columns: 50px 1fr;
}
input.edit[name=task] {
  border: none;
  box-shadow: none;
}
button.destroy{
  display: block;
}
form .destroy:after {
  position: absolute;
  transform: translate(-50%, -50%);
}
.edit {
	position: relative;
	margin: 0;
	width: 100%;
	font-size: 24px;
	font-family: inherit;
	font-weight: inherit;
	line-height: 1.4em;
	color: inherit;
	padding: 6px;
	border: 1px solid #999;
	box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.view:focus-within {
	box-shadow: 0 0 2px 2px #CF7D7D;
	outline: 0;

}

</style>
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

customElements.define('todo-item', TodoItem)
