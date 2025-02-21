import { RndId } from '@/util.js';

export const TodoItem = title => ({ id: RndId(), title, done: false });

export const addTodoItem = R.curry(
  (item, list) => (list.push(item), item)
);

export function useTodoList() {
  return {
    list: reef.signal([]),
  };
}
