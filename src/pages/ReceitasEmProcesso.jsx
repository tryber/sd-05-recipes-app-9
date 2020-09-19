import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { recipeDetailsThunk } from '../actions/recipeDetails';
import Checkbox from '../components/Checkbox';
import '../components/receitasEmProcesso.css';

const copy = require('clipboard-copy');

const copyText = (pathname) => {
  //copia o link da pagina atual
  const linkPaths = pathname.split('/');
  const link = `http://localhost:3000/${linkPaths[1]}/${linkPaths[2]}`;
  document.getElementById('share-btn').innerText = 'Link copiado!';
  copy(link);
};

const rota = (pathname) => {
  // cria um objeto com chaves dizendo o id, e se está na tela de comidas ou bebidas
  const caminhos = pathname.split('/');
  return ({
    comidaOuBebida: caminhos[1],
    id: caminhos[2],
  });
};

const toggleTrueFalse = (bool, setTrueFalse) => (
  setTrueFalse(!bool)
);

const salvarReceita = (receita) => {
  /* salva as receitas prontas quando o usuario clica no botão finalizar receita*/
  const receitaAtual = receita;
  const data = JSON.stringify(new Date());
  receitaAtual.doneDate = data;
  let doneRecipes = localStorage.getItem('doneRecipes');
  if (doneRecipes) {
    doneRecipes = JSON.parse(doneRecipes);
    const vaiProLocalStorage = [...doneRecipes, receitaAtual]
    return localStorage.setItem('doneRecipes', JSON.stringify(vaiProLocalStorage));
  }
  return localStorage.setItem('doneRecipes', JSON.stringify([receitaAtual]));
};

const favoriteChecker = (id, setFavoritado) => {
	// testa se a receita já foi favoritada antes
  let receitasFavoritas = localStorage.getItem('favoriteRecipes');
  if (receitasFavoritas) {
    receitasFavoritas = JSON.parse(receitasFavoritas);
    const receitaNoLocalStorage = receitasFavoritas.find((receita) => receita.id === id);
    if (receitaNoLocalStorage) setFavoritado(true);
  }
};

const shouldUnlock = (ingredients, id, comidaOuBebida) => {
  const inProgressRecipes = localStorage.getItem('inProgressRecipes') ?
  JSON.parse(localStorage.getItem('inProgressRecipes')) : false;
  let key = comidaOuBebida;
  (key === 'comidas') ? key = 'meals' : key = 'cocktails';
  console.log(inProgressRecipes[key][id])
  const progressoAtual = inProgressRecipes[key][id] ? inProgressRecipes[key][id].length : true;
  if (progressoAtual === true) return true;
  const progressoTotal = ingredients.filter((ing) => ing !== undefined && ing !== '').length;
  if (progressoAtual === progressoTotal) return false;
  return true;
};


const storeFavorites = (favoritado, recipe) => {
  //guarda nos favoritos a receita se o usuario clicar no botão favoritar
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

const ReceitasEmProcesso = ({ recipe, carregando, location: { pathname } }) => {
  const [favoritado, setFavoritado] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [finalizar, setFinalizar] = useState(true);
  
  const rotaEid = rota(pathname);
  const { id, comidaOuBebida } = rotaEid;
  
  const dispatch = useDispatch();
  useEffect(() => {
    const receitaDetalhada = recipeDetailsThunk(comidaOuBebida, id);
    favoriteChecker(id, setFavoritado);
    dispatch(receitaDetalhada);
  }, [dispatch, id, comidaOuBebida]);
  
  if (carregando) return <p>Loading</p>;
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
        if (!ingredient|| ingredient === '') return null;
        const data = {
          ingredient,
          index,
          measure: measures[index],
          comidaOuBebida,
          id,
          onChange: () => shouldUnlock(ingredients, id, comidaOuBebida),
        };
        return <Checkbox key={`${ingredient}${index}`} data={data} />;
      })}
      <p data-testid="instructions" >{instructions}</p>
      <button
        className="start-recipe-btn"
        data-testid="finish-recipe-btn"
        disabled={shouldUnlock(ingredients, id, comidaOuBebida)}
        onClick={() => {
          toggleTrueFalse(redirect, setRedirect);
          salvarReceita(recipe.localStorage)
        }}
      >Finalizar receita</button>
    </div>
  );
}

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
