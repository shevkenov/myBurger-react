import * as actionType from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return { type: actionType.ADD_INGREDIENT, ingredientName: name };
}

export const removeIngredient = (name) => {
    return { type: actionType.REMOVE_INGREDIENT, ingredientName: name };
}

const setIngredients = (ingredients) => {
    return { type: actionType.SET_INGREDIENTS, ingredients}
}

const fetchIngredientsFailed = () => {
    return { type: actionType.FETCH_INGREDIENTS_FAILED}
}

export const initIngredients = () => {
    return (dispatch) => {
      axios
        .get("ingredients.json")
        .then((response) => dispatch(setIngredients(response.data)))
        .catch((e) => dispatch(fetchIngredientsFailed(e)));
    };
}