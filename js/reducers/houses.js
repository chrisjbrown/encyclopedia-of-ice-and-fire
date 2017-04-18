
import type { Action } from '../actions/types';
import { SET_HOUSES } from '../actions/houses';

export type State = {
    houses: string
}

const initialState = {
  houses: [],
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_HOUSES) {
    return {
      ...state,
      houses: action.payload,
    };
  }
  return state;
}
