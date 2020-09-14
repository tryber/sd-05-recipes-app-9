import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import categoriesReducer from './categoriesReducer';
import reducerHeaderDrinks from './reducerHeaderDrinks';
import reducerHeaderMeals from './reducerHeaderMeals';

const rootReducers = combineReducers({
  recipesReducer,
  categoriesReducer,
  reducerHeaderDrinks,
  reducerHeaderMeals,
});

export default rootReducers;
