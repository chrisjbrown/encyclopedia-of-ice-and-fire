
import type { Action } from './types';

export const SET_BOOKS = 'SET_BOOKS';

export function setBooks(books:string):Action {
  return {
    type: SET_BOOKS,
    payload: books,
  };
}
