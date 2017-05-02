import * as types from './actionTypes';

export function setSLList(sl_list) {
  return {
    type: types.SET_SL_LIST,
    sl_list
  }
}

export function setSLListEmpty(empty) {
  return {
    type: types.SET_SL_LIST_EMPTY,
    empty
  }
}

export function setSLListSortField(sort_field) {
  return {
    type: types.SET_SL_LIST_SORT_FIELD,
    sort_field
  }
}

export function setSLListSortOrder(sort_order) {
  return {
    type: types.SET_SL_LIST_SORT_ORDER,
    sort_order
  }
}
