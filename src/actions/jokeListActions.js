import * as types from './actionTypes';

export function setJokeList(joke_list) {
  return {
    type: types.SET_JOKE_LIST,
    joke_list
  }
}

export function setJokeListOrder(sort_order, sort_direction) {
  return {
    type: types.SET_JOKE_LIST_ORDER,
    sort_order,
    sort_direction
  }
}
