import { TodoApp } from '@/todo-app/todo-app.js';
import { useTodoList } from '@/todo-app/use-todo-list.js';
import { BaseCalendar } from '@/base-calendar/index.js';

TodoApp(useTodoList());
BaseCalendar({ date: new Date() });
