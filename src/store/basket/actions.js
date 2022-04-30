export const basketActionTypes = {
  SET_IS_OPENED: "BASKET.SET_IS_OPENED",
  ADD_TO_BASKET: "BASKET.ADD_TO_BASKET",
  DELETE_FROM_BASKET: "BASKET.DELETE_FROM_BASKET",
  CHANGE_COUNT: "BASKET.CHANGE_COUNT",
};

export const basketActions = {
  openBasket: (payload) => ({
    type: basketActionTypes.SET_IS_OPENED,
    payload,
  }),
  addToBasket: (payload) => ({
    type: basketActionTypes.ADD_TO_BASKET,
    payload,
  }),
  deleteFromBasket: (payload) => ({
    type: basketActionTypes.DELETE_FROM_BASKET,
    payload,
  }),
  changrProductsCount: (payload) => ({
    type: basketActionTypes.CHANGE_COUNT,
    payload,
  }),
};
