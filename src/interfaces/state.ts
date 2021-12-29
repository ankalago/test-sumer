import { Todo } from '../entities/Todo';

export interface IModal {
  show: boolean
}

export interface IUi {
  loading?: boolean
  modal: IModal
}

export interface IState {
  selectedTodo: number
  todos: Todo[]
  ui: IUi
}
