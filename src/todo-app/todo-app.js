import { BoolAttr, glue, preventDefault } from '@/util.js';
import { addTodoItem, TodoItem } from './use-todo-list.js';

export function TodoApp(props) {
  const NewlyTitle = R.compose( R.prop('title'), Object.fromEntries, R.constructN(1,FormData), R.prop('currentTarget') );

  function html() {
    return (
      `<form onsubmit="handleSubmit(event)">
        <input type="text" name="title">
        <button type="submit">add</button>
      </form>
      <ul>
        ${glue(
          R.map(
            item => (
              `<li>
                <input
                  type="checkbox"
                  ${ BoolAttr(R.prop('done'), R.always('checked'), item) }
                  data-id="${ item.id }"
                  onchange="handleChange(event)"
                >
                ${ item.title }
              </li>`
            ),
            props.list
          )
        )}
      </ul>`
    );
  }

  reef.component(
    '#todo-app',
    html,
    {
      events: {
        handleSubmit: R.pipe(
          preventDefault,
          NewlyTitle,
          TodoItem,
          addTodoItem(R.__, props.list),
        ),
        handleChange: event => {
          const i = R.findIndex(R.propEq(event.target.dataset.id, 'id'), props.list);
          Object.assign(props.list[i], { done: event.target.checked });
        }
      }
    }
  )
}
