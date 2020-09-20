import { combineReducers } from 'redux';
import detailsFetch from './detailsFetch';
import recomendation from './recomendation';
import recipesReducer from './recipesReducer';
import categoriesReducer from './categoriesReducer';
import reducerHeaderDrinks from './reducerHeaderDrinks';
import reducerHeaderMeals from './reducerHeaderMeals';
import valorDoDisabled from './finishRecipeButton';

const rootReducers = combineReducers({
  recipesReducer,
  categoriesReducer,
  reducerHeaderDrinks,
  reducerHeaderMeals,
  detailsFetch,
  recomendation,
  valorDoDisabled,
});

export default rootReducers;
