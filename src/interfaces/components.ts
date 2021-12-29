import { Todo } from '../entities/Todo';

export interface IModal {
  onOkAction: Function,
}

export interface ITodoItem {
  todoItem: Todo
}

export interface IResponse<T> {
  success?: boolean
  count: number
  data: T[]
}
