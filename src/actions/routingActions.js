import * as types from './actionTypes';

export function setVisiblePane(pane) {
  console.log('hi there');
  console.log(pane);
  return {
    type: types.SET_VISIBLE_PANE,
    visible_pane: pane
  };
}
