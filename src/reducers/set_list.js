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
    case types.ADD_JOKE_TO_SL:
      let add = true;
      state.set_list._jokes.forEach((joke) => {
        if (joke._id == action.joke._id) {
          add = false;
        }
      });

      let new_set_list = new SetList(state.set_list);
      if (add) {
        new_set_list._jokes.push(action.joke);
      }

      return {
        ...state,
        set_list: new_set_list
      };
      break;
    case types.REMOVE_JOKE_FROM_SL:
      if (state.set_list._jokes.indexOf(action.joke) != -1 ) {
        state.set_list._jokes.splice(state.set_list._jokes.indexOf(action.joke), 1);
      }

      return {
        ...state,
        set_list: state.set_list
      };
      break;
    case types.DUPLICATE_SL:
      state.set_list._id = -1;
      state.set_list._name = '';

      return {
        ...state,
        set_list: state.set_list
      };
      break;
    default:
      return state;
  }
}
