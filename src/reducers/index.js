import { combineReducers } from 'redux';
import reducer from './reducer';
import reducerHeader from './reducerHeader';

const rootReducers = combineReducers({
  reducer, reducerHeader,
});

export default rootReducers;
