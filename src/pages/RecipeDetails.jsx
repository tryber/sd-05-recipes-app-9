import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { recipeDetailsThunk } from '../actions/recipeDetails';
import Lista from '../components/Lista';
import Recomedations from '../components/Recomendations';
import { recipeRecomendationsThunk } from '../actions/recomendations';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import './RecipeDetails.css';

const onCoTo = (pathname) => {
  const caminhos = pathname.split('/');
  return ({
    bemidas: caminhos[1],
    id: caminhos[2],
  });
};

const videoEmbeder = (link) => (
  <iframe data-testid="video" title="Video de preparo" src={link} width="100%" />
);

const toggleTrueFalse = (bool, setTrueFalse) => (
  setTrueFalse(!bool)
);

const isItDone = (idAtual) => {
  const doneRecipes = localStorage.getItem('doneRecipes') ?
  JSON.parse(localStorage.getItem('doneRecipes')) : false;
  if (doneRecipes === false) return doneRecipes;
  return doneRecipes.some((receita) => (receita.id === idAtual));
};

const isItInProgress = (comidaOuBebida, idAtual) => {
  const inProgressRecipes = localStorage.getItem('inProgressRecipes') ?
  JSON.parse(localStorage.getItem('inProgressRecipes')) : false;
  const key = comidaOuBebida === 'comidas' ? 'meals' : 'cocktails';
  return inProgressRecipes[key][idAtual] ? true : false;
};

const RecipeDetails = (props) => {
  const { recipe, location: { pathname } } = props;
  const { recipeThumb, drinkOrFood, category, ingredientData, instructions, video } = recipe;
  const [redirectProgresso, setRedirectProgresso] = useState(false);
  const dispatch = useDispatch();

  const params = onCoTo(pathname);
  const { id, bemidas } = params;
  useEffect(() => {
    isItDone(id);
    const receitaDetalhada = recipeDetailsThunk(bemidas, id);
    const recomendations = recipeRecomendationsThunk(bemidas);
    dispatch(recomendations);
    dispatch(receitaDetalhada);
  }, [dispatch, pathname, bemidas, id]);
  if (props.loading) return <p>Loading</p>;
  if (redirectProgresso) return <Redirect to={`${pathname}/in-progress`} />;
  return (
    <div>
      <img data-testid="recipe-photo" src={recipeThumb} style={{ width: '100%' }} alt="receita" />
      <h1 data-testid="recipe-title">{drinkOrFood}</h1>
      <h2 data-testid="recipe-category">{category}</h2>
      {(ingredientData) && <Lista data={ingredientData} />}
      <ShareButton pathname={pathname} />
      <FavoriteButton recipe={recipe} id={id} />
      <p data-testid="instructions" >{instructions}</p>
      {(video) && videoEmbeder(video)}
      <Recomedations />
      <button
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        disabled={isItDone(id)}
        onClick={() => toggleTrueFalse(redirectProgresso, setRedirectProgresso)}
      >{isItInProgress(bemidas, id) ? 'Continuar Receita' : 'Começar Receita'}</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipe: state.detailsFetch.recipe,
  loading: state.detailsFetch.carregando,
});

RecipeDetails.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(RecipeDetails);
