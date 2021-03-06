import { IState } from '../interfaces/state';

export const initialState: IState = {
  selectedTodo: 0,
  todos: [],
  ui: {
    loading: true,
    modal: {
      show: false
    },
  },
};
