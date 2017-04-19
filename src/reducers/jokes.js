import * as types from '../actions/actionTypes';

import Joke from '../models/Joke';

const initialState = {
  joke: new Joke() 
};

export default function jokes(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_JOKE:
      return {
        ...state,
        joke: action.joke
      };
    case types.TOGGLE_IN_DEVELOPMENT:
      let joke = state.joke;
      joke._in_development = !joke._in_development;

      return {
        ...state,
        joke
      };
      break;
    default:
      return state;
  }
}
