import { fetchMeals, fetchDrinks, fetchIngredientsMeals, fetchIngredientsDrinks} from '../services/api';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA_MEALS = 'RECEIVE_DATA_MEALS';
export const RECEIVE_DATA_DRINKS = 'RECEIVE_DATA_DRINKS';
export const RECEIVE_DATA_INGREDIENTS_MEAL = 'RECEIVE_DATA_INGREDIENTS_MEAL';
export const RECEIVE_DATA_INGREDIENTS_DRINK = 'RECEIVE_DATA_INGREDIENTS_DRINK';

function requestData() {
  return {
    type: REQUEST_DATA,
  };
}

const receiveDataMeals = (data) => {
  return {
    type: RECEIVE_DATA_MEALS,
    data,
  };
};

const receiveDataDrinks = (data) => {
  return {
    type: RECEIVE_DATA_DRINKS,
    data,
  };
};

const receiveDataIngredientsMeal = (data) => {
  return {
    type: RECEIVE_DATA_INGREDIENTS_MEAL,
    data,
  };
};

const receiveDataIngredientsDrink = (data) => {
  return {
    type: RECEIVE_DATA_INGREDIENTS_DRINK,
    data,
  };
};

export function fetchMealsThunk(tipo, input) {
  return (dispatch) => {
    dispatch(requestData());
    return (fetchMeals(tipo, input))
      .then((json) => dispatch(receiveDataMeals(json)));
  };
}

export function fetchDrinksThunk(tipo, input) {
  return (dispatch) => {
    dispatch(requestData());
    return (fetchDrinks(tipo, input))
      .then((json) => dispatch(receiveDataDrinks(json)));
  };
}

export function fetchIngredientsMealThunk(tipo) {
  return (dispatch) => {
    dispatch(requestData());
    return (fetchIngredientsMeals(tipo))
      .then((json) => dispatch(receiveDataIngredientsMeal(json)));
  };
}

export function fetchIngredientsDrinkThunk(tipo) {
  return (dispatch) => {
    dispatch(requestData());
    return (fetchIngredientsDrinks(tipo))
      .then((json) => dispatch(receiveDataIngredientsDrink(json)));
  };
}
