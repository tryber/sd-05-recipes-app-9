import { SELECTED_AREA, RECIPES_BY_AREA } from '../actions';

const INITIAL_STATE = {
  selectedArea: 'All',
  recipes: [],
};

export default function exploreByAreaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECTED_AREA:
      return ({
        ...state,
        selectedArea: action.area,
      });
    case RECIPES_BY_AREA:
      return ({
        ...state,
        recipes: action.recipes,
      });
    default:
      return state;
  }
}
