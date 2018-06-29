import * as types from '../actions/actionTypes';

import Joke from '../models/joke';

const initialState = {
  joke: new Joke()
};

export default function joke(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_JOKE:
      return {
        ...state,
        joke: action.joke
      };
    case types.TOGGLE_IN_DEVELOPMENT:
      state.joke._in_development = !state.joke._in_development;

      return {
        ...state,
        joke: state.joke
      };
    case types.SET_NAME:
      state.joke._name = action.name;

      return {
        ...state,
        joke: state.joke
      };
    case types.SET_MINUTES:
      state.joke._minutes = action.minutes;

      return {
        ...state,
        joke: state.joke
      };
    case types.SET_SECONDS:
      state.joke._seconds = action.seconds;

      return {
        ...state,
        joke: state.joke
      };
    case types.SET_NOTES:
      state.joke._notes = action.notes;

      return {
        ...state,
        joke: state.joke
      };
    default:
      return state;
  }
}
