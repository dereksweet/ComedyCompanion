import * as types from '../actions/actionTypes';

import SetList from '../models/set_list';

const initialState = {
  set_list: new SetList()
};

export default function set_list(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_SL:
      return {
        ...state,
        set_list: action.set_list
      };
      break;
    case types.SET_SL_NAME:
      state.set_list._name = action.name;

      return {
        ...state,
        set_list: state.set_list
      };
      break;
    case types.SET_SL_LENGTH:
      state.set_list._length = action.length;

      return {
        ...state,
        set_list: state.set_list
      };
      break;
    default:
      return state;
  }
}
