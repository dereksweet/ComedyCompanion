import * as types from './actionTypes';

export function setSL(set_list) {
  return {
    type: types.SET_SL,
    set_list
  }
}

export function setSLName(name) {
  return {
    type: types.SET_SL_NAME,
    name
  }
}

export function setSLLength(length_text) {
  let length = -1;

  if (length_text === '') {
    length = null;
  } else {
    length = parseInt(length_text);
  }

  return {
    type: types.SET_SL_LENGTH,
    length
  }
}

export function addJokeToSL(joke) {
  return {
    type: types.ADD_JOKE_TO_SL,
    joke
  }
}

export function removeJokeFromSL(joke) {
  return {
    type: types.REMOVE_JOKE_FROM_SL,
    joke
  }
}

export function duplicateSL() {
  return {
    type: types.DUPLICATE_SL
  }
}
