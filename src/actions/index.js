import { fetchMeals, fetchDrinks, fetchIngredientsMeals, fetchIngredientsDrinks } from '../services/api';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA_MEALS = 'RECEIVE_DATA_MEALS';
export const RECEIVE_DATA_DRINKS = 'RECEIVE_DATA_DRINKS';
export const RECEIVE_DATA_INGREDIENTS_MEAL = 'RECEIVE_DATA_INGREDIENTS_MEAL';
export const RECEIVE_DATA_INGREDIENTS_DRINK = 'RECEIVE_DATA_INGREDIENTS_DRINK';
export const SAVE_RECIPES = 'SAVE_RECIPES';
export const SAVE_DETAILS = 'SAVE_DETAILS';
export const SAVE_CATEGORIES = 'SAVE_CATEGORIES';
export const SET_RECIPES_BY_CATEGORY = 'SET_RECIPES_BY_CATEGORY';
export const SELECTED_CATEGORY = 'SELECTED_CATEGORY';
export const LOADING_CATEGORY_RECIPES = 'LOADING_CATEGORY_RECIPES';
export const RESET_CATEGORIES = 'RESET_CATEGORIES';
export const SELECTED_AREA = 'SELECTED_AREA';
export const RECIPES_BY_AREA = 'RECIPES_BY_AREA';
export const IS_CATEGORY_FILTERED = 'IS_CATEGORY_FILTERED';
export const CLEAR_DATA_MEALS = 'CLEAR_DATA_MEALS';
export const CLEAR_DATA_DRINKS = 'CLEAR_DATA_DRINKS';

export function saveRecipes(meals, drinks) {
  return {
    type: SAVE_RECIPES,
    meals,
    drinks,
  };
}

export function saveCategories(categories) {
  return {
    type: SAVE_CATEGORIES,
    categories,
  };
}

export function setCategoriesFilter(category, recipes) {
  return {
    type: SET_RECIPES_BY_CATEGORY,
    category,
    recipes,
  };
}

export function selectCategory(selectedCategory) {
  return {
    type: SELECTED_CATEGORY,
    selectedCategory,
  };
}

export function loadingCategoryRecipes(isLoading) {
  return {
    type: LOADING_CATEGORY_RECIPES,
    isLoading,
  };
}

export function resetCategories() {
  return {
    type: RESET_CATEGORIES,
  };
}

export function isCategoryFiltered(categoryFiltered) {
  return {
    type: IS_CATEGORY_FILTERED,
    categoryFiltered,
  }
}

export function requestData() {
  return {
    type: REQUEST_DATA,
  };
}

export function receiveDataMeals(data) {
  return {
    type: RECEIVE_DATA_MEALS,
    data,
  };
}

export function receiveDataDrinks(data) {
  return {
    type: RECEIVE_DATA_DRINKS,
    data,
  };
}

export function clearDataMeals() {
  return { type: CLEAR_DATA_MEALS };
}

export function clearDataDrinks() {
  return { type: CLEAR_DATA_DRINKS };
}

export function receiveDataIngredientsMeal(data) {
  return {
    type: RECEIVE_DATA_INGREDIENTS_MEAL,
    data,
  };
}

export function receiveDataIngredientsDrink(data) {
  return {
    type: RECEIVE_DATA_INGREDIENTS_DRINK,
    data,
  };
}



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
      .then((json) => dispatch(receiveDataDrinks(json)))
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

export function selectedArea(area) {
  return {
    type: SELECTED_AREA,
    area,
  };
}

export function recipesByArea(recipes) {
  return {
    type: RECIPES_BY_AREA,
    recipes,
  };
}
