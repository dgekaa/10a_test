import { basketActionTypes } from "./actions";

const initialState = {
  isOpened: false,
  productsInBasket: {},
};

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case basketActionTypes.SET_IS_OPENED:
      return {
        ...state,
        isOpened: action.payload,
      };

    case basketActionTypes.ADD_TO_BASKET:
      return {
        ...state,
        productsInBasket: {
          ...state.productsInBasket,
          [action.payload.index]: {
            id: action.payload.index,
            count: state.productsInBasket[action.payload.index]
              ? state.productsInBasket[action.payload.index].count + 1
              : 1,
            ...action.payload.product,
          },
        },
      };

    case basketActionTypes.DELETE_FROM_BASKET:
      const products = { ...state.productsInBasket };
      delete products[action.payload];

      return {
        ...state,
        productsInBasket: {
          ...products,
        },
      };

    case basketActionTypes.CHANGE_COUNT:
      const prods = { ...state.productsInBasket };
      prods[action.payload.id].count = action.payload.count;

      return {
        ...state,
        productsInBasket: {
          ...prods,
        },
      };

    default:
      return state;
  }
};
