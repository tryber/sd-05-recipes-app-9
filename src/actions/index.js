export const SAVE_RECIPES = 'SAVE_RECIPES';
export const SAVE_CATEGORIES = 'SAVE_CATEGORIES';
export const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';
export const SET_RECIPES_BY_CATEGORY = 'SET_RECIPES_BY_CATEGORY';

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
  }
}

export function setCategoriesFilter(category) {
  return {
    type: SET_CATEGORY_FILTER,
    category,
  }
}

export function setRecipesByCategory(recipesByCategory) {
  return {
    type: SET_RECIPES_BY_CATEGORY,
    recipesByCategory,
  }
}
