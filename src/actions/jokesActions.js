import * as types from './actionTypes';

export function setJoke(joke) {
  return {
    type: types.SET_JOKE,
    joke
  }
}

export function toggleInDevelopment() {
  return {
    type: types.TOGGLE_IN_DEVELOPMENT
  }
}
