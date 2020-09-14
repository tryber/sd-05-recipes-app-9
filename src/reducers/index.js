import { combineReducers } from 'redux';
import reducer from './reducer';
import detailsFetch from './detailsFetch';
import recomendation from './recomendation';

const rootReducers = combineReducers({
  reducer,
  detailsFetch,
  recomendation,
});

export default rootReducers;
