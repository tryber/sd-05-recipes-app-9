import { SAVE_CATEGORIES, SET_CATEGORY_FILTER, SET_RECIPES_BY_CATEGORY } from '../actions';

const INITIAL_STATE = {
  categories: [],
  categoriesFilter: 'All',
  recipesByCategory: [],
};

export default function categoriesReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SAVE_CATEGORIES:
      return ({
        ...state,
        categories: action.categories.slice(0, 5),
      });
    case SET_CATEGORY_FILTER:
      return ({
        ...state,
        categoriesFilter: action.category,
      })
    case SET_RECIPES_BY_CATEGORY:
      return ({
        ...state,
        recipesByCategory: action.recipesByCategory,
      })
    default:
      return state;
  }
}
