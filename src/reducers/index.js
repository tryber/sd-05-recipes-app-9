import { combineReducers } from 'redux';
import detailsFetch from './detailsFetch';
import recomendation from './recomendation';
import recipesReducer from './recipesReducer';
import categoriesReducer from './categoriesReducer';
import reducerHeaderDrinks from './reducerHeaderDrinks';
import reducerHeaderMeals from './reducerHeaderMeals';
import exploreByAreaReducer from './exploreByAreaReducer';

const rootReducers = combineReducers({
  recipesReducer,
  categoriesReducer,
  reducerHeaderDrinks,
  reducerHeaderMeals,
  detailsFetch,
  recomendation,
  exploreByAreaReducer,
});

export default rootReducers;
