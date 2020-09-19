import { REQUEST_DATA, RECEIVE_DATA_DRINKS, RECEIVE_DATA_INGREDIENTS_DRINK, CLEAR_DATA_DRINKS } from '../actions/index';

const INITIAL_STATE = {
  loading: true,
  data: [],
};

function reducerHeaderDrinks(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_DATA_DRINKS:
      return {
        ...state,
        loading: false,
        data: (action.data.drinks === null) ? [] : action.data.drinks.slice(0, 12),
      };
    case RECEIVE_DATA_INGREDIENTS_DRINK:
      return {
        ...state,
        loading: false,
        data: (action.data === null) ? [] : action.data.drinks.slice(0, 12),
      };
    case CLEAR_DATA_DRINKS:
      return {
        ...state,
        loading: true,
        data: [],
      }
    default:
      return state;
  }
}

export default reducerHeaderDrinks;
