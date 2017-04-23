import * as types from '../actions/actionTypes';

const initialState = {
  joke_list: [],
  sort_order: '_updated_at',
  sort_direction: 'DESC'
};

export default function joke_list(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_JOKE_LIST:
      return {
        ...state,
        joke_list: action.joke_list
      };
      break;
    case types.SET_JOKE_LIST_ORDER:
      return {
        ...state,
        sort_order: action.sort_order,
        sort_direction: action.sort_direction
      };
      break;
    default:
      return state;
  }
}
