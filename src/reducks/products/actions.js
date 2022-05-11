import * as types from './types';

export const fetchProductsAction = (products) => {
  return {
    type: types.FETCH_PRODUCTS,
    payload: products,
  };
};

export const deleteProductAction = (products) => {
  return {
    type: types.DELETE_PRODUCT,
    payload: products,
  };
};
