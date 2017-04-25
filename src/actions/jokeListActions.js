import * as types from './actionTypes';

export function setJokeList(joke_list) {
  return {
    type: types.SET_JOKE_LIST,
    joke_list
  }
}

export function setJokeListEmpty(empty) {
  return {
    type: types.SET_JOKE_LIST_EMPTY,
    empty
  }
}

export function setJokeListSortField(sort_field) {
  return {
    type: types.SET_JOKE_LIST_SORT_FIELD,
    sort_field
  }
}

export function setJokeListSortOrder(sort_order) {
  return {
    type: types.SET_JOKE_LIST_SORT_ORDER,
    sort_order
  }
}

export function setJokeListFilter(name_filter) {
  return {
    type: types.SET_JOKE_LIST_FILTER,
    name_filter
  }
}
