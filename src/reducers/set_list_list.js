import * as types from '../actions/actionTypes';

const initialState = {
  sl_list: [],
  empty: true,
  sort_field: '_updated_at',
  sort_order: 'DESC'
};

export default function set_list_list(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_SL_LIST:
      return {
        ...state,
        sl_list: action.sl_list
      };
    case types.SET_SL_LIST_EMPTY:
      return {
        ...state,
        empty: action.empty
      };
    case types.SET_SL_LIST_SORT_FIELD:
      return {
        ...state,
        sort_field: action.sort_field
      };
    case types.SET_SL_LIST_SORT_ORDER:
      return {
        ...state,
        sort_order: action.sort_order
      };
    default:
      return state;
  }
}
