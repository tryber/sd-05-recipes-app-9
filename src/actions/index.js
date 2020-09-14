export const SAVE_RECIPES = 'SAVE_RECIPES';
export const SAVE_DETAILS = 'SAVE_DETAILS';

export function saveRecipes(meals) {
  return {
    type: SAVE_RECIPES,
    meals,
  };
}
