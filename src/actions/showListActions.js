import * as types from './actionTypes';

export function setShowList(show_list) {
  return {
    type: types.SET_SHOW_LIST,
    show_list
  }
}

export function setShowListEmpty(empty) {
  return {
    type: types.SET_SHOW_LIST_EMPTY,
    empty
  }
}

export function setShowListSortField(sort_field) {
  return {
    type: types.SET_SHOW_LIST_SORT_FIELD,
    sort_field
  }
}

export function setShowListSortOrder(sort_order) {
  return {
    type: types.SET_SHOW_LIST_SORT_ORDER,
    sort_order
  }
}

export function setShowListFilter(venue_filter) {
  return {
    type: types.SET_SHOW_LIST_FILTER,
    venue_filter
  }
}
