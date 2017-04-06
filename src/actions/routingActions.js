import * as types from './actionTypes';

export function setTitle(pane) {
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
    type: types.SET_TITLE,
    title
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
