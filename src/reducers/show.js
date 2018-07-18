import * as types from '../actions/actionTypes';

import Show from '../models/show';

import AudioService from '../services/AudioService';

const initialState = {
  show: new Show(),
  is_timing: false,
  timer_start: null,
  is_recording: false,
  is_playing: false,
  delete_recording_confirm: false,
  replace_recording_confirm: false,
  show_recording_info: false,
  audio_service: null,
  display_time_seconds: 0
};

export default function show(state = initialState, action = {}) {
  let new_show = new Show(state.show);

  switch (action.type) {
    case types.SET_SHOW:
      return {
        ...state,
        show: action.show,
        audio_service: new AudioService({ show_id: action.show._id })
      };
    case types.SET_SHOW_VENUE:
      new_show._venue = action.venue;

      return {
        ...state,
        show: new_show
      };
    case types.SET_SHOW_DATE:
      new_show._date = action.date;

      return {
        ...state,
        show: new_show
      };
    case types.SET_SHOW_CITY:
      new_show._city = action.city;

      return {
        ...state,
        show: new_show
      };
    case types.SET_SHOW_STATE:
      new_show._state = action.state;

      return {
        ...state,
        show: new_show
      };
    case types.SET_SHOW_SET_LIST:
      new_show._set_list = action.set_list;

      return {
        ...state,
        show: new_show
      };
    case types.START_SHOW_TIMER:
      new_show._show_time_seconds = 0;

      return {
        ...state,
        show: new_show,
        timer_start: new Date(),
        is_timing: true
      };
    case types.STOP_SHOW_TIMER:
      return {
        ...state,
        is_timing: false
      };
    case types.RESET_SHOW_TIMER:
      new_show._show_time_seconds = 0;

      return {
        ...state,
        show: new_show,
        timer_start: null,
        is_timing: false
      };
    case types.UPDATE_SHOW_TIMER:
      new_show._show_time_seconds = action.time;

      return {
        ...state,
        show: new_show
      };
    case types.SET_DISPLAY_TIMER:
      return {
        ...state,
        display_time_seconds: Math.floor(action.time)
      };
    case types.SET_HAS_RECORDING:
      new_show._has_recording = action.has_recording;

      return {
        ...state,
        show: new_show
      };
    case types.TOGGLE_DELETE_RECORDING_CONFIRM:
      return {
        ...state,
        delete_recording_confirm: !state.delete_recording_confirm
      };
    case types.TOGGLE_REPLACE_RECORDING_CONFIRM:
      return {
        ...state,
        replace_recording_confirm: !state.replace_recording_confirm
      };
    case types.TOGGLE_RECORDING_INFO:
      return {
        ...state,
        show_recording_info: !state.show_recording_info
      };
    case types.START_RECORDING:
      return {
        ...state,
        is_recording: true
      };
    case types.STOP_RECORDING:
      return {
        ...state,
        is_recording: false
      };
    case types.START_PLAYING:
      return {
        ...state,
        is_playing: true
      };
    case types.STOP_PLAYING:
      return {
        ...state,
        is_playing: false
      };
    default:
      return state;
  }
}
