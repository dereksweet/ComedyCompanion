import * as types from '../actions/actionTypes';

const initialState = {
  joke_list: []
};

export default function joke_list(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_JOKE_LIST:
      return {
        ...state,
        joke_list: action.joke_list
      };
      break;
    default:
      return state;
  }
}
