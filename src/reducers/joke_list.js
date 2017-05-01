import * as types from '../actions/actionTypes';

const initialState = {
  joke_list: [],
  joke_list_selector: [],
  empty: true,
  sort_field: '_updated_at',
  sort_order: 'DESC',
  name_filter: '',
  name_filter_selector: '',
  in_development: false,
  in_development_selector: false
};

export default function joke_list(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_JOKE_LIST:
      return {
        ...state,
        joke_list: action.joke_list
      };
      break;
    case types.SET_JOKE_LIST_SELECTOR:
      return {
        ...state,
        joke_list_selector: action.joke_list
      };
      break;
    case types.SET_JOKE_LIST_EMPTY:
      return {
        ...state,
        empty: action.empty
      };
      break;
    case types.SET_JOKE_LIST_SORT_FIELD:
      return {
        ...state,
        sort_field: action.sort_field
      };
      break;
    case types.SET_JOKE_LIST_SORT_ORDER:
      return {
        ...state,
        sort_order: action.sort_order
      };
      break;
    case types.SET_JOKE_LIST_FILTER:
      return {
        ...state,
        name_filter: action.name_filter
      };
      break;
    case types.SET_JOKE_LIST_FILTER_SELECTOR:
      return {
        ...state,
        name_filter_selector: action.name_filter
      };
      break;
    case types.TOGGLE_JOKE_LIST_IN_DEVELOPMENT:
      return {
        ...state,
        in_development: !state.in_development
      };
      break;
    case types.TOGGLE_JOKE_LIST_IN_DEVELOPMENT_SELECTOR:
      return {
        ...state,
        in_development_selector: !state.in_development_selector
      };
      break;
    default:
      return state;
  }
}
