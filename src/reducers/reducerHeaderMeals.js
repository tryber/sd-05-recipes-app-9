import { REQUEST_DATA, RECEIVE_DATA_MEALS, RECEIVE_DATA_INGREDIENTS_MEAL } from '../actions/index';

const INITIAL_STATE = {
  loading: true,
  data: [],
  ingredient_explore: '',
};

function reducerHeaderMeals(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_DATA_MEALS:
      return {
        ...state,
        loading: false,
        data: (action.data.meals === null) ? [] : action.data.meals.slice(0, 12),
      };

    case RECEIVE_DATA_INGREDIENTS_MEAL:
      return {
        ...state,
        loading: false,
        data: (action.data.meals === null) ? [] : action.data.meals.slice(0, 12),
      };

    default:
      return state;
  }
}

export default reducerHeaderMeals;
