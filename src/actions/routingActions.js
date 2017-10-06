import * as types from './actionTypes';

export function setPane(pane) {
    let title = '';

    switch(pane) {
      case 'jokes':
        title = 'Jokes';
        break;
      case 'set_lists':
        title = 'Set Lists';
        break;
      case 'shows':
        title = 'Shows';
        break;
      default :
        title = 'Unknown Route';
    }

  return {
    type: types.SET_PANE,
    title,
    pane
  }
}

export function setVisiblePanes(panes) {
  return {
    type: types.SET_VISIBLE_PANES,
    panes
  }
}

export function addVisiblePane(pane) {
  return {
    type: types.ADD_VISIBLE_PANE,
    pane
  }
}

export function removeVisiblePane(pane) {
  return {
    type: types.REMOVE_VISIBLE_PANE,
    pane
  }
}

export function openModal() {
  return {
    type: types.OPEN_MODAL
  }
}

export function closeModal() {
  return {
    type: types.CLOSE_MODAL
  }
}

export function toggleSettings() {
  return {
    type: types.TOGGLE_SETTINGS
  }
}

export function toggleAbout() {
  return {
    type: types.TOGGLE_ABOUT
  }
}

export function toggleDownload() {
  return {
    type: types.TOGGLE_DOWNLOAD
  }
}

export function hideLoading() {
  return {
    type: types.HIDE_LOADING
  }
}

export function toggleTimer() {
  return {
    type: types.TOGGLE_TIMER
  }
}
