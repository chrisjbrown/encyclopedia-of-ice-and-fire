
import type { Action } from './types';

export const SET_HOUSES = 'SET_HOUSES';

export function setHouses(houses:string):Action {
  return {
    type: SET_HOUSES,
    payload: houses,
  };
}
