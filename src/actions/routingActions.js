import * as types from './actionTypes';

export function setVisiblePane(pane) {
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
    type: types.SET_VISIBLE_PANE,
    visible_pane: pane,
    title: title
  };
}
