import { REQUEST_DATA, RECEIVE_DATA_MEALS, RECEIVE_DATA_DRINKS, RECEIVE_DATA_INGREDIENTS_MEAL, RECEIVE_DATA_INGREDIENTS_DRINK } from '../actions/index';

const INITIAL_STATE = {
  loading: true,
  data: [],
};

function reducerHeader(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_DATA_MEALS:
      return {
        loading: false,
        data: (action.data.meals === null) ? [] : action.data.meals.slice(0, 12),
      };
    case RECEIVE_DATA_DRINKS:
      return {
        loading: false,
        data: (action.data.drinks === null) ? [] : action.data.drinks.slice(0, 12),
      };
    case RECEIVE_DATA_INGREDIENTS_MEAL:
      return {
        loading: false,
        data: (action.data.meals === null) ? [] : action.data.meals.slice(0, 12),
      };
    case RECEIVE_DATA_INGREDIENTS_DRINK:
      return {
        loading: false,
        data: (action.data === null) ? [] : action.data.drinks.slice(0, 12),
      };
    default:
      return state;
  }
}

export default reducerHeader;
