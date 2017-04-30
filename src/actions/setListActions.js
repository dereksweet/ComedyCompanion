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

  if (length_text == '') {
    length = null;
  } else {
    length = parseInt(length_text);
  }
  
  return {
    type: types.SET_SL_LENGTH,
    length
  }
}
