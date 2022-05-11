import * as types from './types';
import initialState from '../store/initiallState';

export const UsersReducer = (state = initialState.users, { type, payload }) => {
  switch (type) {
    case types.SIGN_IN:
      return {
        ...state,
        ...payload,
      };
    case types.SIGN_OUT:
    default:
      return state;
  }
};
