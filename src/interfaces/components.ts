import { Todo } from '../entities/Todo';

export interface IModal {
  onOkAction: Function,
}

export interface ITodoItem {
  todoItem: Todo
}

export interface IResponseGet<T> {
  count: number
  data: T[]
}

export interface IResponsePostPutDelete<T> {
  success?: boolean
  data: T
}
