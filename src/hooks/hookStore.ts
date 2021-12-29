import create, { SetState } from 'zustand';
import { initialState } from '../store/state';
import { reducers } from '../store/reducers';
import { Store } from '../store/types';

const useStore = create<Store>((set: SetState<Store>) => ({
  ...initialState,
  ...reducers(set)
}));

export default useStore;
