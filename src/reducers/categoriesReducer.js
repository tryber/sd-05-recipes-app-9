import { SAVE_CATEGORIES, SET_RECIPES_BY_CATEGORY, SELECTED_CATEGORY, LOADING_CATEGORY_RECIPES, RESET_CATEGORIES, IS_CATEGORY_FILTERED } from '../actions';

const INITIAL_STATE = {
  categories: [],
  categoriesFilter: [],
  selectedCategory: 'All',
  isLoading: false,
  categoryFiltered: false,
};

export default function categoriesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE_CATEGORIES:
      return ({
        ...state,
        categories: action.categories.slice(0, 5),
      });
    case SET_RECIPES_BY_CATEGORY:
      return ({
        ...state,
        categoriesFilter: [
          ...state.categoriesFilter,
          {
            category: action.category,
            recipes: action.recipes,
          },
        ],
      });
    case SELECTED_CATEGORY:
      return ({
        ...state,
        selectedCategory: action.selectedCategory,
      });
    case LOADING_CATEGORY_RECIPES:
      return ({
        ...state,
        isLoading: action.isLoading,
      });
    case RESET_CATEGORIES:
      return ({
        ...state,
        categoriesFilter: [],
        selectedCategory: 'All',
      });
    case IS_CATEGORY_FILTERED:
      return ({
        ...state,
        categoryFiltered: action.categoryFiltered,
      })
    default:
      return state;
  }
}

// export default function categoriesReducer(state = INITIAL_STATE, action) {
//   if (action.type === SAVE_CATEGORIES) {return ({
//     ...state,
//     categories: action.categories.slice(0, 5),
//   });}
//   else if (action.type === SET_RECIPES_BY_CATEGORY) return ({
//     ...state,
//     categoriesFilter: [
//       ...state.categoriesFilter,
//       {
//         category: action.category,
//         recipes: action.recipes,
//       }
//     ],
//   });
//   else if (action.type === SELECTED_CATEGORY) return ({
//     ...state,
//     selectedCategory: action.selectedCategory,
//   });
//   else if (action.type === LOADING_CATEGORY_RECIPES) return ({
//     ...state,
//     isLoading: action.isLoading,
//   });
//   else if (action.type === RESET_CATEGORIES) return ({
//     ...state,
//     categoriesFilter: [],
//     selectedCategory: 'All',
//   });
//   return state;
// }
