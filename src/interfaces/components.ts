import { Todo } from '../entities/Todo';

export interface IModal {
  onOkAction: Function,
}

export interface ITodoItem {
  todoItem: Todo
}
