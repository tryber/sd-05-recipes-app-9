import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import categoriesReducer from './categoriesReducer';
import reducer from './reducer';
import reducerHeaderDrinks from './reducerHeaderDrinks';
import reducerHeaderMeals from './reducerHeaderMeals';

const rootReducers = combineReducers({
  recipesReducer,
  categoriesReducer,
  reducer,
  reducerHeaderDrinks,
  reducerHeaderMeals,
});

export default rootReducers;
