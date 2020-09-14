import {
  SUCESSO,
  CARREGANDO,
} from '../actions/recipeDetails';
import recipeMapper from '../services/recipeMapper';

const INICIAL_STATE = {
  carregando: true,
  recipe: [],
};

function recipeDetails(state = INICIAL_STATE, action) {
  switch (action.type) {
    case SUCESSO:
      return { carregando: false, recipe: recipeMapper(action.recipe) };
    case CARREGANDO:
      return { ...state, carregando: true };
    default:
      return state;
  }
}

export default recipeDetails;
