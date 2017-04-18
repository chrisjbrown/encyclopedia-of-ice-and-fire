
import type { Action } from '../actions/types';
import { SET_BOOK, CLEAR_BOOK } from '../actions/book';

export type State = {
    book: string
}

const initialState = {
  book: {},
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_BOOK) {
    return {
      ...state,
      book: action.payload,
    };
  }
  if (action.type === CLEAR_BOOK) {
    return initialState;
  }
  return state;
}
