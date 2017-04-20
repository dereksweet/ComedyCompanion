import * as types from '../actions/actionTypes';

const initialState = {
  keyboard_height: 0,
  modal_height: 0
};

export default function layout(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_KEYBOARD_HEIGHT:
      return {
        ...state,
        keyboard_height: action.keyboard_height
      };
      break;
    case types.SET_MODAL_HEIGHT:
      return {
        ...state,
        modal_height: action.modal_height
      };
      break;
    default:
      return state;
  }
}
