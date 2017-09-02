import * as types from './actionTypes';

export function setExportEmail(export_email) {
  return {
    type: types.SET_EXPORT_EMAIL,
    export_email
  }
}
