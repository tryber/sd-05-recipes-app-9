import { SAVE_CATEGORIES, SET_RECIPES_BY_CATEGORY, SELECTED_CATEGORY, LOADING_CATEGORY_RECIPES, RESET_CATEGORIES } from '../actions';

const INITIAL_STATE = {
  categories: [],
  categoriesFilter: [],
  selectedCategory: 'All',
  isLoading: false,
};

// function breakingTheSwitch(state, action) {
//   if (action.type === SELECTED_CATEGORY) ({
//     ...state,
//     selectedCategory: action.selectedCategory,
//   })
//   if (action.type === LOADING_CATEGORY_RECIPES) ({
//     ...state,
//     isLoading: action.isLoading,
//   })
//   if (action.type === RESET_CATEGORIES) ({
//     ...state,
//     categoriesFilter: [],
//     selectedCategory: "All",
//   })
// }

export default function categoriesReducer(state = INITIAL_STATE, action) {
  if (action.type === SAVE_CATEGORIES) return ({
    ...state,
    categories: action.categories.slice(0, 5),
  });
  else if (action.type === SET_RECIPES_BY_CATEGORY) return ({
    ...state,
    categoriesFilter: [
      ...state.categoriesFilter,
      {
        category: action.category,
        recipes: action.recipes,
      }
    ],
  });
  else if (action.type === SELECTED_CATEGORY) return ({
    ...state,
    selectedCategory: action.selectedCategory,
  });
  else if (action.type === LOADING_CATEGORY_RECIPES) return ({
    ...state,
    isLoading: action.isLoading,
  });
  else if (action.type === RESET_CATEGORIES) return ({
    ...state,
    categoriesFilter: [],
    selectedCategory: "All",
  });
  else return state;
}
