import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { recipeDetailsThunk } from '../actions/recipeDetails';
import Lista from '../components/Lista';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Recomedations from '../components/Recomendations';
import { recipeRecomendationsThunk } from '../actions/recomendations';
import './RecipeDetails.css';

const copy = require('clipboard-copy');

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

const copyText = (pathname) => {
  const link = `http://localhost:3000${pathname}`;
  document.getElementById('share-btn').innerText = 'Link copiado!';
  copy(link);
};

const storeFavorites = (favoritado, recipe) => {
  const { id, type, area, category, alcoholicOrNot, name, image } = recipe.localStorage;
  let receitasFavoritas = localStorage.getItem('favoriteRecipes');

  if (receitasFavoritas !== undefined && receitasFavoritas !== '') {
    receitasFavoritas = JSON.parse(receitasFavoritas);
  }

  const novaReceita = {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
  };

  if (favoritado) {
    receitasFavoritas = receitasFavoritas.filter((receita) => receita.id !== novaReceita.id);
    return localStorage.setItem('favoriteRecipes', JSON.stringify(receitasFavoritas));
  }

  if (receitasFavoritas !== undefined && receitasFavoritas !== null &&
      receitasFavoritas.length !== 0) {
    receitasFavoritas = [...receitasFavoritas, novaReceita];
    return localStorage.setItem('favoriteRecipes', JSON.stringify(receitasFavoritas));
  }

  return localStorage.setItem('favoriteRecipes', JSON.stringify([novaReceita]));
};

const favoriteChecker = (id, setFavoritado) => {
  let receitasFavoritas = localStorage.getItem('favoriteRecipes');
  if (receitasFavoritas) {
    receitasFavoritas = JSON.parse(receitasFavoritas);
    const receitaNoLocalStorage = receitasFavoritas.find((receita) => receita.id === id);
    if (receitaNoLocalStorage) setFavoritado(true);
  }
};

const isItDone = (idAtual) => {
  const doneRecipes = localStorage.getItem('doneRecipes') ?
  JSON.parse(localStorage.getItem('doneRecipes')) : false;
  if (doneRecipes === false) return doneRecipes;
  return doneRecipes.some((receita) => (receita.id === idAtual));
};

const isItInProgress = (bemidas, idAtual) => {
  const inProgressRecipes = localStorage.getItem('inProgressRecipes') ?
  JSON.parse(localStorage.getItem('inProgressRecipes')) : false;
  if (inProgressRecipes === false) return inProgressRecipes;
  const { meals, cocktails } = inProgressRecipes;
  if (bemidas === 'comidas') {
    return meals[idAtual] ? true : false;
  }
  if (bemidas === 'bebidas') {
    return cocktails[idAtual] ? true : false;
  }
};

const RecipeDetails = (props) => {
  const { recipe, location: { pathname } } = props;
  const { recipeThumb, drinkOrFood, category, ingredientData, instructions, video } = recipe;

  const [favoritado, setFavoritado] = useState(false);
  const [redirectProgresso, setRedirectProgresso] = useState(false);
  const dispatch = useDispatch();

  const params = onCoTo(pathname);
  const { id, bemidas } = params
  useEffect(() => {
    isItDone(id);
    favoriteChecker(id, setFavoritado);
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
      <button id="share-btn" onClick={() => copyText(pathname)} >
        <img data-testid="share-btn" src={shareIcon} alt="share" />
      </button>
      <button
        onClick={() => {
          toggleTrueFalse(favoritado, setFavoritado);
          storeFavorites(favoritado, recipe);
        }}
      >
        <img
          data-testid="favorite-btn"
          src={favoritado ? blackHeartIcon : whiteHeartIcon} alt="love"
        />
      </button>
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
