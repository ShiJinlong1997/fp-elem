import { Frag, ElemsHTML, preventDefault } from '@/util.js';

export function TodoApp(ctx) {
  function TodoForm(props) {
    function init() {
      identity.addEventListener(
        'submit',
        R.pipe(
          preventDefault,
          NewlyTitle,
          props.TodoItem,
          props.addTodoItem,
          item => dispatchEvent(new CustomEvent('todolist:add', { detail: item }))
        )
      );
    }

    const NewlyTitle = R.compose( R.prop('title'), Object.fromEntries, R.constructN(1, FormData), R.prop('currentTarget') );

    const identity = Frag(
      `<form>
        <input type="text" name="title">
        <button type="submit">add</button>
      </form>`
    )
    .firstElementChild;

    return {
      init,
      identity,
    };
  }

  function TodoList(props) {
    function init() {
      identity.addEventListener(
        'change',
        event => {
          const i = R.findIndex(R.propEq(event.target.dataset.id, 'id'), props.list);
          Object.assign(props.list[i], { done: event.target.checked })
        },
        { capture: true }
      );
      render();
    }

    function render() {
      identity.innerHTML = ElemsHTML(
        R.map(item => (
          `<li>
            <input
              type="checkbox"
              ${ item.done ? 'checked' : '' }
              data-id="${ item.id }"
            >
            ${ item.title }
          </li>`
        )),
        props.list
      );
    }

    const identity = document.createElement('ul');

    return {
      identity,
      init,
      render,
    };
  }

  const todoForm = TodoForm(ctx);
  const todoList = TodoList(ctx);
  R.forEach(R.invoker(0, 'init'), [todoForm, todoList]);

  addEventListener('todolist:add', () => todoList.render());

  return {
    children: [todoForm.identity, todoList.identity],
  };
}
