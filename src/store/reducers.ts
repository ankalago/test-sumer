import { SetState } from 'zustand';
import { Reducers, Store } from './types';
import { IState, IUi } from '../interfaces/state';
import { Todo } from '../entities/Todo';

export const reducers = (set: SetState<Store>): Reducers => ({
  setUi: (ui: IUi) =>
    set((state: IState) => ({
      ui: {
        ...state.ui,
        ...ui
      }
    })),
  setTodos: (todos: Todo[]) =>
    set(() => ({
      todos
    })),
  setSelectedTodo: (todoId: number) =>
    set(() => ({
      selectedTodo: todoId
    })),
});
