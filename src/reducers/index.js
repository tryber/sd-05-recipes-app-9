import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import categoriesReducer from './categoriesReducer';


const rootReducers = combineReducers({
  recipesReducer,
  categoriesReducer,
});

export default rootReducers;
