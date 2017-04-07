import * as types from '../actions/actionTypes';

const initialState = {
  hamburger_active: false,
  height: 0
};

export default function statusBar(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOGGLE_HAMBURGER_ACTIVE:
      return {
        ...state,
        hamburger_active: !state.hamburger_active
      };
      break;
    default:
      return state;
  }
}
