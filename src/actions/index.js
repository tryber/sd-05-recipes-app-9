export const SAVE_RECIPES = 'SAVE_RECIPES';
export const SAVE_CATEGORIES = 'SAVE_CATEGORIES';
export const SET_RECIPES_BY_CATEGORY = 'SET_RECIPES_BY_CATEGORY';
export const SELECTED_CATEGORY = 'SELECTED_CATEGORY';
export const LOADING_CATEGORY_RECIPES = 'LOADING_CATEGORY_RECIPES';
export const RESET_CATEGORIES = 'RESET_CATEGORIES';

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
