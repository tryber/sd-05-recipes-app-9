export const SAVE_RECIPES = 'SAVE_RECIPES';

export function saveRecipes(meals) {
  return { 
    type: SAVE_RECIPES,
    meals,
  }
}
