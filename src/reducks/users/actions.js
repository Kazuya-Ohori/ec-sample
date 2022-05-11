import * as types from './types';

export const signInAction = (userState) => {
  return {
    type: types.SIGN_IN,
    payload: {
      isSignedIn: userState.isSignedIn,
      role: userState.role,
      uid: userState.uid,
      username: userState.username,
    },
  };
};

export const singOutAction = () => {
  return {
    type: types.SIGN_OUT,
  };
};
