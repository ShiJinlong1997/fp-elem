import { RndId } from '@/util.js';

export function useTodoList() {
  const list = [];

  const TodoItem = title => ({ id: RndId(), title, done: false });

  function add(item) {
    list.push(item);
  }

  return {
    list,
    TodoItem,
    addTodoItem: add,
  };
}
