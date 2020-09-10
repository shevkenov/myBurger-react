import * as actionType from "../actions/actionTypes";
import { updateState } from "../utility";

const initialState = {
  ingredients: null,
  error: false,
  totalPrice: 0,
  prices: null,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: ++state.ingredients[action.ingredientName],
  };
  const updatedIngredients = updateState(state.ingredients, updatedIngredient);
  const updatedState = {
    ...updatedIngredients,
    totalPrice: (state.totalPrice += state.prices[action.ingredientName]),
  };
  return updateState(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: --state.ingredients[action.ingredientName],
  };
  const updatedIngredients = updateState(state.ingredients, updatedIngredient);
  const updatedState = {
    ...updatedIngredients,
    totalPrice: (state.totalPrice -= state.prices[action.ingredientName]),
  };
  return updateState(state, updatedState);
};

const setIngredients = (state, action) => {
  const ingredients = Object.keys(action.ingredients)
    .sort((a, b) => {
      return action.ingredients[a].order - action.ingredients[b].order;
    })
    .reduce((acc, cur) => {
      acc[cur] = action.ingredients[cur].peaces;
      return acc;
    }, {});

  const prices = Object.keys(action.ingredients).reduce((acc, cur) => {
    acc[cur] = action.ingredients[cur].price;
    return acc;
  }, {});

  const updatedState = {
    error: false,
    ingredients,
    prices,
    totalPrice: 0,
  };

  return updateState(state, updatedState);
};

const fetchIngredients = (state, action) => {
  return updateState(state, {error: true})
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionType.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionType.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionType.FETCH_INGREDIENTS_FAILED:
      return fetchIngredients(state, action)
    default:
      return state;
  }
};

export default reducer;
