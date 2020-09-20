import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { recipeDetailsThunk } from '../actions/recipeDetails';
import Checkbox from '../components/Checkbox';
import ButtonFinish from '../components/ButtonFinish';
import { destravar } from '../actions/finishRecipeButton';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { progressChecker } from '../services/localStorage';
import '../components/receitasEmProcesso.css';

const rota = (pathname) => {
  // cria um objeto com chaves dizendo o id, e se está na tela de comidas ou bebidas
  const caminhos = pathname.split('/');
  return ({
    comidaOuBebida: caminhos[1],
    id: caminhos[2],
  });
};

const agradoAoCC = (key, id, inProgressRecipes, ingredients) => {
  const progressoAtual = inProgressRecipes[key][id] ? inProgressRecipes[key][id].length : true;
  if (progressoAtual === true) return true;
  const progressoTotal = ingredients.filter((ing) =>
    (ing !== null && ing !== '' && ing !== undefined)).length;
  if (progressoAtual === progressoTotal) {
    return false;
  }
  return true;
};

const shouldUnlock = (ingredients, id, comidaOuBebida) => {
  // vê se o botão finalizar deveria ser desbloqueado
  const inProgressRecipes = localStorage.getItem('inProgressRecipes') ?
  JSON.parse(localStorage.getItem('inProgressRecipes')) : false;
  const key = comidaOuBebida === 'comidas' ? 'meals' : 'cocktails';
  if (!inProgressRecipes) return true;
  return agradoAoCC(key, id, inProgressRecipes, ingredients);
};

const ReceitasEmProcesso = ({ recipe, carregando, location: { pathname } }) => {
  const [redirect, setRedirect] = useState(false);

  const rotaEid = rota(pathname);
  const { id, comidaOuBebida } = rotaEid;

  const dispatch = useDispatch();
  useEffect(() => {
    const receitaDetalhada = recipeDetailsThunk(comidaOuBebida, id);
    dispatch(receitaDetalhada);
  }, [dispatch, id, comidaOuBebida]);
  if (carregando) return <p>Loading</p>;
  if (redirect) return <Redirect to="/receitas-feitas" />;
  const { recipeThumb, drinkOrFood, category, ingredientData, instructions } = recipe;
  const { ingredients, measures } = ingredientData;
  dispatch(destravar(shouldUnlock(ingredients, id, comidaOuBebida)));
  return (
    <div>
      <img data-testid="recipe-photo" src={recipeThumb} style={{ width: '100%' }} alt="receita" />
      <h1 data-testid="recipe-title">{drinkOrFood}</h1>
      <h2 data-testid="recipe-category">{category}</h2>
      <ShareButton pathname={pathname} />
      <FavoriteButton recipe={recipe} id={id} />
      {ingredients.map((ingredient, index) => {
        if (!ingredient || ingredient === '') return null;
        const data = {
          ingredient,
          index,
          measure: measures[index],
          comidaOuBebida,
          id,
          onChange: () => shouldUnlock(ingredients, id, comidaOuBebida),
          progresso: () => progressChecker(id, comidaOuBebida, `${ingredient}${index}`),
        };
        return <Checkbox key={`${ingredient}${Math.random()}`} data={data} />;
      })}
      <p data-testid="instructions" >{instructions}</p>
      <ButtonFinish
        data={{
          redirecionar: () => setRedirect,
          redirState: redirect,
          recipe,
          unlock: () => shouldUnlock(ingredients, id, comidaOuBebida),
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipe: state.detailsFetch.recipe,
  carregando: state.detailsFetch.carregando,
});

ReceitasEmProcesso.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  carregando: PropTypes.bool.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(ReceitasEmProcesso);
