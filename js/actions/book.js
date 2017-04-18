
import type { Action } from './types';

export const SET_BOOK = 'SET_BOOK';
export const CLEAR_BOOK = 'CLEAR_BOOK';

export function setBook(book:string):Action {
  return {
    type: SET_BOOK,
    payload: book,
  };
}

export function clearBook():Action {
  return {
    type: CLEAR_BOOK,
  };
}
