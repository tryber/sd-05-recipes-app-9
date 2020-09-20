import {
  RECOMENDATION_SUCESSO,
  RECOMENDATION_CARREGANDO,
} from '../actions/recomendations';

const INICIAL_STATE = {
  recomendations: [],
  carregando: true,
};

const cardAdapter = (receitas) => {
  const receitasAdaptadas = receitas.map((receita) => ({
    imagem: receita.strMealThumb || receita.strDrinkThumb,
    title: receita.strMeal || receita.strDrink,
    category: receita.strCategory,
    id: receita.idMeal || receita.idDrink,
  }));
  return receitasAdaptadas.slice(0, 6);
};

function recomendations(state = INICIAL_STATE, action) {
  switch (action.type) {
    case RECOMENDATION_CARREGANDO:
      return { ...state, carregando: true };
    case RECOMENDATION_SUCESSO:
      return { carregando: false, recomendations: cardAdapter(action.recipe) };
    default:
      return state;
  }
}

export default recomendations;
