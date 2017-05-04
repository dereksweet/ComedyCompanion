import * as types from '../actions/actionTypes';

import Show from '../models/show';

const initialState = {
  show: new Show()
};

export default function show(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_SHOW:
      return {
        ...state,
        show: action.show
      };
      break;
    case types.SET_SHOW_VENUE:
      state.show._venue = action.venue;

      return {
        ...state,
        show: state.show
      };
      break;
    case types.SET_SHOW_DATE:
      state.show._date = action.date;

      return {
        ...state,
        show: state.show
      };
      break;
    case types.SET_SHOW_CITY:
      state.show._city = action.city;

      return {
        ...state,
        show: state.show
      };
      break;
    case types.SET_SHOW_STATE:
      state.show._state = action.state;

      return {
        ...state,
        show: state.show
      };
      break;
    case types.SET_SHOW_SET_LIST:
      state.show._set_list = action.set_list;

      return {
        ...state,
        show: state.show
      };
      break;
    default:
      return state;
  }
}
