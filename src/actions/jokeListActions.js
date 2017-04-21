import * as types from './actionTypes';

export function setJokeList(joke_list) {
  return {
    type: types.SET_JOKE_LIST,
    joke_list
  }
}
