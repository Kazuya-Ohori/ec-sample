import * as types from './types';
import initialState from '../store/initiallState';

export const ProductsReducer = (
  state = initialState.products,
  { type, payload }
) => {
  switch (type) {
    case types.FETCH_PRODUCTS:
    case types.DELETE_PRODUCT:
      return {
        ...state,
        list: [...payload],
      };
    default:
      return state;
  }
};
