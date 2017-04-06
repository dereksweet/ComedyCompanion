import * as types from './actionTypes';

export function toggleHamburgerActive() {
  return {
    type: types.TOGGLE_HAMBURGER_ACTIVE
  };
}

export function setStatusBarHeight(height) {
  return {
    type: types.SET_STATUS_BAR_HEIGHT,
    height
  }
}
