import * as types from '../actions/actionTypes';

const initialState = {
  visible_pane: 'jokes',
  title: 'Jokes'
};

export default function routing(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_VISIBLE_PANE:
      return {
        ...state,
        visible_pane: action.visible_pane,
        title: action.title
      };
    default:
      return state;
  }
}
