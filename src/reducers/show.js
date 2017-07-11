import * as types from '../actions/actionTypes';

import AudioService from '../services/AudioService';
import Show from '../models/show';

const initialState = {
  show: new Show(),
  is_timing: false,
  start_time: null,
  is_recording: false,
  is_playing: false,
  delete_recording_confirm: false,
  replace_recording_confirm: false,
  audio_service: null
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
      break;
    case types.SET_SHOW_VENUE:
      new_show._venue = action.venue;

      return {
        ...state,
        show: new_show
      };
      break;
    case types.SET_SHOW_DATE:
      new_show._date = action.date;

      return {
        ...state,
        show: new_show
      };
      break;
    case types.SET_SHOW_CITY:
      new_show._city = action.city;

      return {
        ...state,
        show: new_show
      };
      break;
    case types.SET_SHOW_STATE:
      new_show._state = action.state;

      return {
        ...state,
        show: new_show
      };
      break;
    case types.SET_SHOW_SET_LIST:
      new_show._set_list = action.set_list;

      return {
        ...state,
        show: new_show
      };
      break;
    case types.RESET_SHOW_TIMER:
      if (action.time) {
        new_show._show_time_seconds = Math.round(action.time);
      } else {
        new_show._show_time_seconds = 0;
      }

      return {
        ...state,
        show: new_show,
        start_time: null,
        is_timing: false
      };
      break;
    case types.START_SHOW_TIMER:
      new_show._show_time_seconds = 0;

      return {
        ...state,
        show: new_show,
        start_time: new Date(),
        is_timing: true
      };
      break;
    case types.STOP_SHOW_TIMER:
      return {
        ...state,
        is_timing: false
      };
      break;
    case types.UPDATE_SHOW_TIMER:
      if (action.time) {
        new_show._show_time_seconds = Math.round(action.time);
      } else {
        new_show._show_time_seconds = Math.round((new Date() - state.start_time) / 1000);
      }

      return {
        ...state,
        show: new_show
      };
      break;
    case types.SET_HAS_RECORDING:
      new_show._has_recording = action.has_recording;

      return {
        ...state,
        show: new_show
      };
      break;
    case types.TOGGLE_DELETE_RECORDING_CONFIRM:
      return {
        ...state,
        delete_recording_confirm: !state.delete_recording_confirm
      };
      break;
    case types.TOGGLE_REPLACE_RECORDING_CONFIRM:
      return {
        ...state,
        replace_recording_confirm: !state.replace_recording_confirm
      };
      break;
    case types.START_RECORDING:
      new_show._show_time_seconds = 0;

      return {
        ...state,
        show: new_show,
        start_time: new Date(),
        is_timing: true,
        is_recording: true
      };
      break;
    case types.STOP_RECORDING:
      return {
        ...state,
        is_timing: false,
        is_recording: false
      };
      break;
    case types.START_PLAYING:
      return {
        ...state,
        is_playing: true
      };
      break;
    case types.STOP_PLAYING:
      return {
        ...state,
        is_playing: false
      };
      break;
    default:
      return state;
  }
}
