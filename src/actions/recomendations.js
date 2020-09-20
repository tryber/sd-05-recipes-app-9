import { fetchDrinks, fetchMeals } from '../services/api';

export const RECOMENDATION_SUCESSO = 'RECOMENDATION_SUCESSO';
export const RECOMENDATION_CARREGANDO = 'RECOMENDATION_CARREGANDO';

function sucesso(receita) {
  return {
    type: RECOMENDATION_SUCESSO,
    recipe: receita.meals ? receita.meals : receita.drinks,
  };
}

function carregando() {
  return {
    type: RECOMENDATION_CARREGANDO,
  };
}

export function recipeRecomendationsThunk(tipo) {
  return (dispatch) => {
    dispatch(carregando());
    if (tipo === 'comidas') {
      return fetchDrinks('s', '').then((r) => dispatch(sucesso(r)));
    }
    return fetchMeals('s', '').then((r) => dispatch(sucesso(r)));
  };
}
