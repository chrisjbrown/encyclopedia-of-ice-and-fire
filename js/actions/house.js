
import type { Action } from './types';

export const SET_HOUSE = 'SET_HOUSE';
export const CLEAR_HOUSE = 'CLEAR_BOOK';

export function setHouse(house:string):Action {
  return {
    type: SET_HOUSE,
    payload: house,
  };
}

export function clearHouse():Action {
  return {
    type: CLEAR_HOUSE,
  };
}
