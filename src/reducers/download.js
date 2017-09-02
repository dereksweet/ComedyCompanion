import * as types from '../actions/actionTypes';

const initialState = {
  export_email: ''
};

export default function joke(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_EXPORT_EMAIL:
      console.log(action.export_email);

      return {
        ...state,
        export_email: action.export_email
      };
      break;
    default:
      return state;
  }
}
