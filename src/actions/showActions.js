import * as types from './actionTypes';

export function setShow(show) {
  return {
    type: types.SET_SHOW,
    show
  }
}

export function setShowVenue(venue) {
  return {
    type: types.SET_SHOW_VENUE,
    venue
  }
}

export function setShowDate(date) {
  return {
    type: types.SET_SHOW_DATE,
    date
  }
}

export function setShowCity(city) {
  return {
    type: types.SET_SHOW_CITY,
    city
  }
}

export function setShowState(state) {
  return {
    type: types.SET_SHOW_STATE,
    state
  }
}

export function setShowSetList(set_list) {
  return {
    type: types.SET_SHOW_SET_LIST,
    set_list
  }
}

export function resetShowTimer() {
  return {
    type: types.RESET_SHOW_TIMER
  }
}

export function startShowTimer() {
  return {
    type: types.START_SHOW_TIMER
  }
}

export function stopShowTimer() {
  return {
    type: types.STOP_SHOW_TIMER
  }
}

export function updateShowTimer(time = null) {
  return {
    type: types.UPDATE_SHOW_TIMER,
    time
  }
}

export function setHasRecording(has_recording) {
  return {
    type: types.SET_HAS_RECORDING,
    has_recording
  }
}

export function toggleDeleteRecordingConfirm() {
  return {
    type: types.TOGGLE_DELETE_RECORDING_CONFIRM
  }
}

export function toggleReplaceRecordingConfirm() {
  return {
    type: types.TOGGLE_REPLACE_RECORDING_CONFIRM
  }
}

export function startRecording() {
  return {
    type: types.START_RECORDING
  }
}

export function stopRecording() {
  return {
    type: types.STOP_RECORDING
  }
}

export function startPlaying() {
  return {
    type: types.START_PLAYING
  }
}

export function stopPlaying() {
  return {
    type: types.STOP_PLAYING
  }
}
