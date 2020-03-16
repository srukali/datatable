import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './datatable.actions';

export const initialState = 0;

const _datatableReducer = createReducer(initialState,
  on(increment, state => state + 1),
  on(decrement, state => state - 1),
  on(reset, state => 0),
);

export function datatableReducer(state, action) {
  return _datatableReducer(state, action);
}
