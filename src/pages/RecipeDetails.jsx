import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { recipeDetailsThunk } from '../actions/recipeDetails';
import Lista from '../components/Lista';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Recomendations from '../components/Recomendations';
import { recipeRecomendationsThunk } from '../actions/recomendations';

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
  const copy = require('clipboard-copy');
  const link = `http://localhost:3000${pathname}`;
  document.getElementById('share-btn').innerText='Link copiado!'
  copy(link);
};

const storeFavorites = (favoritado, recipe) => {
  const { id, type, area, category, alcoholicOrNot, name, image } = recipe.localStorage;
  let receitasFavoritas = localStorage.getItem('favoriteRecipes');

  if (receitasFavoritas !== undefined || receitasFavoritas !== null ) {
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
}

const favoriteChecker = (id, setFavoritado) => {
  const receitasFavoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const receitaNoLocalStorage = receitasFavoritas.find((receita) => receita.id === id);
  if (receitaNoLocalStorage) setFavoritado(true);
}

const RecipeDetails = (props) => {
  const { recipe, location: { pathname } } = props;
  const { recipeThumb, drinkOrFood, category, ingredientData, instructions, video } = recipe;

  const [favoritado, setFavoritado] = useState(false);
  const [redirectProgresso, setRedirectProgresso] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = onCoTo(pathname);
    favoriteChecker(params.id, setFavoritado);
    const receitaDetalhada = recipeDetailsThunk(params.bemidas, params.id);
    const recomendations = recipeRecomendationsThunk(params.bemidas);
    dispatch(recomendations);
    dispatch(receitaDetalhada);
  }, [dispatch, pathname]);

  if (props.loading) return <p>Loading</p>
  if (redirectProgresso) return <Redirect to={`${pathname}/in-progress`} />;

  return(
    <div>
      <img data-testid="recipe-photo" src={recipeThumb} style={{width: "100%"}} alt="receita" />
      <h1>{drinkOrFood}</h1>
      <h2>{category}</h2>
      {(ingredientData) && <Lista data={ingredientData} />}
      <button data-testid="share-btn" id="share-btn" onClick={() => copyText(pathname)} >
        <img src={shareIcon} alt="share" />
      </button>
      <button
        data-testid="favorite-btn"
        onClick={() => { 
          toggleTrueFalse(favoritado, setFavoritado);
          storeFavorites(favoritado, recipe);
        }}
      >
        <img src={favoritado ? blackHeartIcon : whiteHeartIcon} alt="love" />
      </button>
      <p data-testid="instructions" >{instructions}</p>
      {(video) && videoEmbeder(video)}
      <Recomendations />
      <button
        data-testid="start-recipe-btn"
        style={{ position: 'fixed-bottom', }}
        onClick={() => toggleTrueFalse(redirectProgresso, setRedirectProgresso)}
      >Começar a receita</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipe: state.detailsFetch.recipe,
  loading: state.detailsFetch.carregando,
});

export default connect(mapStateToProps)(RecipeDetails);
