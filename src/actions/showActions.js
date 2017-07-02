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

export function updateShowTimer() {
  return {
    type: types.UPDATE_SHOW_TIMER
  }
}
