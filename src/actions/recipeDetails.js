import { fetchDetails } from '../services/api';

export const SUCESSO = 'SUCESSO';
export const CARREGANDO = 'CARREGANDO';

function sucesso(receita) {
  return {
    type: SUCESSO,
    recipe: receita.meals ? receita.meals[0] : receita.drinks[0],
  };
}

function carregando() {
  return {
    type: CARREGANDO,
  };
}

export function recipeDetailsThunk(tipo, id) {
  return (dispatch) => {
    dispatch(carregando());
    return fetchDetails(tipo, id).then(
      (r) => dispatch(sucesso(r)),
    );
  };
}
