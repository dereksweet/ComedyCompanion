import * as types from './actionTypes';

export function setKeyboardHeight(keyboard_height) {
  return {
    type: types.SET_KEYBOARD_HEIGHT,
    keyboard_height
  }
}

export function setModalHeight(modal_height) {
  return {
    type: types.SET_MODAL_HEIGHT,
    modal_height
  }
}
