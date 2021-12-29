import { IState, IUi } from '../interfaces/state';
import { Todo } from '../entities/Todo';

export type Reducers = {
  setUi: (ui: IUi) => void;
  setTodos: (todo: Todo[]) => void;
  setSelectedTodo: (todoId: number) => void;
};

export type Store = IState & Reducers;
