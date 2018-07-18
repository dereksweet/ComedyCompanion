import * as types from '../actions/actionTypes';

const initialState = {
  export_email: '',
  export_email_type: 'formatted'
};

export default function joke(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_EXPORT_EMAIL:
      return {
        ...state,
        export_email: action.export_email
      };
    case types.SET_EXPORT_EMAIL_TYPE:
      return {
        ...state,
        export_email_type: action.export_email_type
      };
    default:
      return state;
  }
}
