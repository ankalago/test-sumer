import { Todo } from '../entities/Todo';

export interface IModal {
  show: boolean
}

export interface IUi {
  modal: IModal
}

export interface IState {
  selectedTodo: number
  todos: Todo[]
  ui: IUi
}
