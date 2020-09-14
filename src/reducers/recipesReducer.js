import { SAVE_RECIPES } from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
};

export default function recipesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE_RECIPES:
      return ({
        ...state,
        meals: action.meals,
        drinks: action.drinks,
      });
    default:
      return state;
  }
}
