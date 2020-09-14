import { combineReducers } from 'redux';
import detailsFetch from './detailsFetch';
import recomendation from './recomendation';
import recipesReducer from './recipesReducer';
import categoriesReducer from './categoriesReducer';
import reducerHeaderDrinks from './reducerHeaderDrinks';
import reducerHeaderMeals from './reducerHeaderMeals';

const rootReducers = combineReducers({
  recipesReducer,
  categoriesReducer,
  reducerHeaderDrinks,
  reducerHeaderMeals,
  detailsFetch,
  recomendation,
});

export default rootReducers;
