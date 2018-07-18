import * as types from '../actions/actionTypes';

const initialState = {
  pane: 'jokes',
  visible_panes: ['jokes', 'set_lists', 'shows'],
  title: 'Jokes',
  modal_visible: false,
  settings_visible: false,
  about_visible: false,
  download_visible: false,
  timer_visible: false,
  show_loading: true
};

export default function routing(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_PANE:
      return {
        ...state,
        pane: action.pane,
        title: action.title
      };
    case types.SET_VISIBLE_PANES:
      return {
        ...state,
        visible_panes: action.panes
      };
    case types.ADD_VISIBLE_PANE:
      let add_visible_panes = state.visible_panes;
      if (add_visible_panes.indexOf(action.pane) === -1) {
        add_visible_panes.push(action.pane);
      }

      return {
        ...state,
        visible_panes: add_visible_panes
      };
    case types.REMOVE_VISIBLE_PANE:
      let remove_visible_panes = state.visible_panes;
      let index = remove_visible_panes.indexOf(action.pane);
      if (index != -1) {
        remove_visible_panes.splice(index, 1);
      }

      return {
        ...state,
        visible_panes: remove_visible_panes
      };
    case types.OPEN_MODAL:
      return {
        ...state,
        modal_visible: true
      };
    case types.CLOSE_MODAL:
      return {
        ...state,
        modal_visible: false
      };
    case types.TOGGLE_SETTINGS:
      return {
        ...state,
        settings_visible: !state.settings_visible
      };
    case types.TOGGLE_ABOUT:
      return {
        ...state,
        about_visible: !state.about_visible
      };
    case types.TOGGLE_DOWNLOAD:
      return {
        ...state,
        download_visible: !state.download_visible
      };
    case types.HIDE_LOADING:
      return {
        ...state,
        show_loading: false
      };
    case types.TOGGLE_TIMER:
      return {
        ...state,
        timer_visible: !state.timer_visible
      };
    default:
      return state;
  }
}
