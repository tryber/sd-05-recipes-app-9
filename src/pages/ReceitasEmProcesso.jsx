import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { recipeDetailsThunk } from '../actions/recipeDetails';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import IngredientChecklist from '../components/IngredientChecklist';

const copy = require('clipboard-copy');

const onCoTo = (pathname) => {
  const caminhos = pathname.split('/');
  return ({
    bemidas: caminhos[1],
    id: caminhos[2],
  });
};

const favoriteChecker = (id, setFavoritado) => {
  let receitasFavoritas = localStorage.getItem('favoriteRecipes');
  if (receitasFavoritas) {
    receitasFavoritas = JSON.parse(receitasFavoritas);
    const receitaNoLocalStorage = receitasFavoritas.find((receita) => receita.id === id);
    if (receitaNoLocalStorage) setFavoritado(true);
  }
};

const copyText = (pathname) => {
  const linkPaths = pathname.split('/');
  const link = `http://localhost:3000/${linkPaths[1]}/${linkPaths[2]}`;
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

const toggleTrueFalse = (bool, setTrueFalse) => (
  setTrueFalse(!bool)
);

const unlockFinish = (finalizar, setFinalizar) => {
  const done = document.getElementsByClassName('textoRiscado').length;
  console.log('done', done);
  let total =  document.getElementsByClassName('ingredientContainer').length;
  console.log('total', total);
  if (done === total) return setFinalizar(!finalizar);
};

const RecipeDetails = (props) => {
  const { recipe, location: { pathname } } = props;
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [finalizar, setFinalizar] = useState(true);
  const [favoritado, setFavoritado] = useState(false);
  const params = onCoTo(pathname);

  useEffect(() => {
    favoriteChecker(params.id, setFavoritado);
    const receitaDetalhada = recipeDetailsThunk(params.bemidas, params.id);
    dispatch(receitaDetalhada);
  }, [dispatch, pathname]);

  if (props.loading) return <p>Loading</p>;
  if (redirect) return <Redirect to="/receitas-feitas" />;
  const { recipeThumb, drinkOrFood, category, ingredientData, instructions } = recipe;
  const { ingredients, measures } = ingredientData;

  return (
    <div>
      <img data-testid="recipe-photo" src={recipeThumb} style={{ width: '100%' }} alt="receita" />
      <h1 data-testid="recipe-title">{drinkOrFood}</h1>
      <h2 data-testid="recipe-category">{category}</h2>
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
      {ingredients.map((ingredient, index) => {
        const data = {
          ingredient,
          measure: measures[index],
          onChange: () => (unlockFinish(finalizar, setFinalizar)),
          id: params.id,
          bemidas: params.bemidas,
        }
       return <IngredientChecklist key={`${ingredient}${index}i`}index={index} data={data} />
      })}
      <p data-testid="instructions" >{instructions}</p>
      <button
        className="start-recipe-btn"
        data-testid="finish-recipe-btn"
        disabled={finalizar}
        onClick={() => {
          toggleTrueFalse(redirect, setRedirect);
        }}
      >Finalizar receita</button>
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