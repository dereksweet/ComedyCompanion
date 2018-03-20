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

  if (isNumeric(minutes_text)) {
    minutes = parseInt(minutes_text);
  } else {
    minutes = null;
  }

  return {
    type: types.SET_MINUTES,
    minutes
  }
}

export function setSeconds(seconds_text) {
  let seconds = -1;

  if (isNumeric(seconds_text)) {
    seconds = parseInt(seconds_text);
  } else {
    seconds = null;
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

/* ---------- private ------------- */

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
