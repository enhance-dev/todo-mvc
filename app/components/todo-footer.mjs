/* globals customElements, document */
import enhance from '@enhance/element'
import API from '../browser/api.mjs'
const api = API()

const todoFooter =   {
  api,
  init(element) {
    const params = new URLSearchParams(document.location.search)
    const initialFilter = params.get("filter")
    element.api.store.initialize({filter:initialFilter || 'all'})
  },
  keys: ['todos', 'completed', 'active', 'filter'],
  render({ html, state }) {
    const { store = {} } = state
    const { todos = [], active = [], completed = [], filter = 'all' } = store
    const display = (todos.length || active.length || completed.length) ? 'block' : 'none'

    return html`
  <footer class="footer" style="display: ${display};">
    <span class="todo-count"><strong>${active.length}</strong> items left</span>
    <ul class="filters">
      <li><a href="/" class="${filter === 'all' ? 'selected' : ''}">All</a></li>
      <li><a href="/?filter=active" class="${filter === 'active' ? 'selected' : ''}">Active</a></li>
      <li><a href="/?filter=completed" class="${filter === 'completed' ? 'selected' : ''}">Completed</a></li>
    </ul>
    <form action="/todos/completed/delete" method="POST">
      <button class="clear-completed" style="display: ${completed.length ? 'block' : 'none'};">Clear completed</button>
    </form>
  </footer>
    `
  },
  connectedCallback() {
    this.footer = this.querySelector('footer')
    this.counter = this.querySelector('strong')
    this.filters = this.querySelector('ul.filters')
    this.button = this.querySelector('button')
    this.clearCompleted = this.querySelector('button.clear-completed')

    this.handleIntercept = this.handleIntercept.bind(this)
    this.clear = this.clear.bind(this)

    this.filters.addEventListener('click', this.handleIntercept)
    this.filters.addEventListener('keydown', this.handleIntercept)
    this.clearCompleted.addEventListener('click', this.clear)
  },
  disconnectedCallback() {
    this.filters.removeEventListener('click', this.handleIntercept)
    this.filters.removeEventListener('keydown', this.handleIntercept)
    this.clearCompleted.removeEventListener('click', this.clear)
  },
  clear(event) {
    event.preventDefault()
    this.api.clear()
  },
  handleIntercept(event) {
    if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
      event.preventDefault()
      let list = Array.from(this.filters.querySelectorAll('a'))
      list.map(anchor => {
        anchor === event.target ? anchor.classList.add('selected') : anchor.classList.remove('selected')
      })
      const url = new URL(event.target.href);
      history.pushState({}, '', url.pathname + url.search)
      const filter = url.searchParams.get("filter") || 'all'
      this.api.store.filter = filter
    }
  }
}

enhance('todo-footer',  todoFooter)
export default todoFooter 
