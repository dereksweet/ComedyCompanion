import * as types from '../actions/actionTypes';

const initialState = {
  show_list: [],
  empty: true,
  sort_field: '_updated_at',
  sort_order: 'DESC',
  venue_filter: ''
};

export default function show_list(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_SHOW_LIST:
      return {
        ...state,
        show_list: action.show_list
      };
      break;
    case types.SET_SHOW_LIST_EMPTY:
      return {
        ...state,
        empty: action.empty
      };
      break;
    case types.SET_SHOW_LIST_SORT_FIELD:
      return {
        ...state,
        sort_field: action.sort_field
      };
      break;
    case types.SET_SHOW_LIST_SORT_ORDER:
      return {
        ...state,
        sort_order: action.sort_order
      };
      break;
    case types.SET_SHOW_LIST_FILTER:
      return {
        ...state,
        venue_filter: action.venue_filter
      };
      break;
    default:
      return state;
  }
}
