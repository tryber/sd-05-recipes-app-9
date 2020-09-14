import { combineReducers } from 'redux';
import reducer from './reducer';
import reducerHeaderDrinks from './reducerHeaderDrinks';
import reducerHeaderMeals from './reducerHeaderMeals';

const rootReducers = combineReducers({
  reducer, reducerHeaderDrinks, reducerHeaderMeals,
});

export default rootReducers;
