import * as types from '../actions/actionTypes';

const initialState = {
  joke_list: [],
  empty: false,
  sort_field: '_updated_at',
  sort_order: 'DESC',
  name_filter: ''
};

export default function joke_list(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_JOKE_LIST:
      return {
        ...state,
        joke_list: action.joke_list
      };
      break;
    case types.SET_JOKE_LIST_EMPTY:
      return {
        ...state,
        empty: action.empty
      };
      break;
    case types.SET_JOKE_LIST_SORT_FIELD:
      return {
        ...state,
        sort_field: action.sort_field
      };
      break;
    case types.SET_JOKE_LIST_SORT_ORDER:
      return {
        ...state,
        sort_order: action.sort_order
      };
      break;
    case types.SET_JOKE_LIST_FILTER:
      return {
        ...state,
        name_filter: action.name_filter
      };
      break;
    default:
      return state;
  }
}
