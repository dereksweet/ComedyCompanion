import * as types from './actionTypes';

export function setExportEmail(export_email) {
  return {
    type: types.SET_EXPORT_EMAIL,
    export_email
  }
}

export function setExportEmailType(export_email_type) {
  return {
    type: types.SET_EXPORT_EMAIL_TYPE,
    export_email_type
  }
}
