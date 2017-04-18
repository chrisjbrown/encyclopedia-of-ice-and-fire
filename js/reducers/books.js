
import type { Action } from '../actions/types';
import { SET_BOOKS } from '../actions/books';

export type State = {
    books: string
}

const initialState = {
  books: [],
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_BOOKS) {
    return {
      ...state,
      books: action.payload,
    };
  }
  return state;
}
