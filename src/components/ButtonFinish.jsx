import React from 'react';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { destravar } from '../actions/finishRecipeButton';

const toggleTrueFalse = (bool, setTrueFalse) => setTrueFalse(!bool);

const salvarReceita = (receita) => {
  /* salva as receitas prontas quando o usuario clica no botão finalizar receita*/
  const receitaAtual = receita;
  const data = JSON.stringify(new Date());
  receitaAtual.doneDate = data;
  let doneRecipes = localStorage.getItem('doneRecipes');
  if (doneRecipes) {
    doneRecipes = JSON.parse(doneRecipes);
    const vaiProLocalStorage = [...doneRecipes, receitaAtual];
    return localStorage.setItem(
      'doneRecipes',
      JSON.stringify(vaiProLocalStorage),
    );
  }
  return localStorage.setItem('doneRecipes', JSON.stringify([receitaAtual]));
};

const ButtonFinish = ({ data, finalizar }) => {
  const dispatch = useDispatch();
  const { redirecionar, redirState, recipe, unlock } = data;
  useEffect(() => {
    dispatch(destravar(unlock()));
  }, [unlock, dispatch]);
  return (
    <button
      className="start-recipe-btn"
      data-testid="finish-recipe-btn"
      disabled={finalizar}
      onClick={() => {
        toggleTrueFalse(redirState, redirecionar());
        salvarReceita(recipe.localStorage);
      }}
    >
      Finalizar receita
    </button>
  );
};

const mapStateToProps = (state) => ({
  finalizar: state.valorDoDisabled.finishButton,
});

ButtonFinish.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  finalizar: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(ButtonFinish);
