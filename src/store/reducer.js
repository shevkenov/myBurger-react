import * as actionType from "./action";

const initialState = {
  ingredients: {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0
  },
  totalPrice: 0,
};

const PRICES = {
  salad: 0.5,
  bacon: 0.8,
  meat: 1.3,
  cheese: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: ++state.ingredients[action.ingredientName],
        },
        totalPrice: (state.totalPrice += PRICES[action.ingredientName]),
      };
    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: --state.ingredients[action.ingredientName],
        },
        totalPrice: (state.totalPrice -= PRICES[action.ingredientName]),
      };

    default:
      return state;;
  }
};

export default reducer;
