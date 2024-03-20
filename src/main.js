import { TodoApp } from '@/todo-app/todo-app.js';
import { useTodoList } from '@/todo-app/use-todo-list.js';
import { BaseCalendar } from './base-calendar/index.js';
import { DateInfoDic, DatesDic } from './base-calendar/use-date-info.js';

function main() {
  document.body.append(
    // ...TodoApp(useTodoList()).children,
    BaseCalendar({ DateInfoDic, DatesDic }).identity,
  );
}

main();
