export default function TodoApp({ html }) {
  return html`
    <style>
.todoapp {
	background: #fff;
	margin: 130px 0 40px 0;
	position: relative;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
	            0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
	font-style: italic;
	font-weight: 400;
	color: rgba(0, 0, 0, 0.4);
}

.todoapp input::-moz-placeholder {
	font-style: italic;
	font-weight: 400;
	color: rgba(0, 0, 0, 0.4);
}

.todoapp input::input-placeholder {
	font-style: italic;
	font-weight: 400;
	color: rgba(0, 0, 0, 0.4);
}

.todoapp h1 {
	position: absolute;
	top: -140px;
	width: 100%;
	font-size: 80px;
	font-weight: 200;
	text-align: center;
	color: #b83f45;
	-webkit-text-rendering: optimizeLegibility;
	-moz-text-rendering: optimizeLegibility;
	text-rendering: optimizeLegibility;
}

    </style>
      <section class="todoapp">
        <slot name="header"></slot>
        <slot name="list"></slot>
        <slot name="footer"></slot>
      </section>
    `
}
