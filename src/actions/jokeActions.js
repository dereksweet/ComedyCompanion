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

export function setName(name) {
  return {
    type: types.SET_NAME,
    name
  }
}

export function setMinutes(minutes_text) {
  let minutes = -1;

  if (minutes_text === '') {
    minutes = null;
  } else {
    minutes = parseInt(minutes_text);
  }

  return {
    type: types.SET_MINUTES,
    minutes
  }
}

export function setSeconds(seconds_text) {
  let seconds = -1;

  if (seconds_text === '') {
    seconds = null;
  } else {
    seconds = parseInt(seconds_text);
  }

  return {
    type: types.SET_SECONDS,
    seconds
  }
}

export function setNotes(notes) {
  return {
    type: types.SET_NOTES,
    notes
  }
}
