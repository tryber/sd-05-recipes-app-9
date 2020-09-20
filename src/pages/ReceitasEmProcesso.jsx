import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { recipeDetailsThunk } from '../actions/recipeDetails';
import Checkbox from '../components/Checkbox';
import ButtonFinish from '../components/ButtonFinish';
import { destravar } from '../actions/finishRecipeButton';
import '../components/receitasEmProcesso.css';

const copy = require('clipboard-copy');

const copyText = (pathname) => {
  //copia o link da pagina atual
  const linkPaths = pathname.split('/');
  const link = `http://localhost:3000/${linkPaths[1]}/${linkPaths[2]}`;
  document.getElementById('share-btn').innerText = 'Link copiado!';
  copy(link);
};

const toggleTrueFalse = (bool, setTrueFalse) => (
  setTrueFalse(!bool)
);

const rota = (pathname) => {
  // cria um objeto com chaves dizendo o id, e se está na tela de comidas ou bebidas
  const caminhos = pathname.split('/');
  return ({
    comidaOuBebida: caminhos[1],
    id: caminhos[2],
  });
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
  //vê se o botão finalizar deveria ser desbloqueado
  const inProgressRecipes = localStorage.getItem('inProgressRecipes') ?
  JSON.parse(localStorage.getItem('inProgressRecipes')) : false;
  let key = comidaOuBebida;
  (key === 'comidas') ? key = 'meals' : key = 'cocktails';
  if (!inProgressRecipes) return true; 
  const progressoAtual = inProgressRecipes[key][id] ? inProgressRecipes[key][id].length : true;
  if (progressoAtual === true) return true;
  const progressoTotal = ingredients.filter((ing) =>
    (ing !== null && ing !== '' && ing !== undefined)).length;
  if (progressoAtual === progressoTotal) {
    return false;
  }
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

const progressChecker = (id, comidaOuBebida, idElemento) => {
  //checa se o checkbox atual está marcado
  const inProgressRecipes = localStorage.getItem('inProgressRecipes') ?
  JSON.parse(localStorage.getItem('inProgressRecipes')) : false;
  let key = comidaOuBebida;
  (key === 'comidas') ? key = 'meals' : key = 'cocktails';
  const categoriaAtual = inProgressRecipes[key];
  if (inProgressRecipes === false) return null;
  if (categoriaAtual[id] === undefined) return null;
  if (categoriaAtual[id].includes(idElemento)) {
    document.getElementById(idElemento).className="textoRiscado";
  }
  return categoriaAtual[id].includes(idElemento);
};

const ReceitasEmProcesso = ({ recipe, carregando, location: { pathname } }) => {
  const [favoritado, setFavoritado] = useState(false);
  const [redirect, setRedirect] = useState(false);

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
  dispatch(destravar(shouldUnlock(ingredients, id, comidaOuBebida)));
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
          progresso: () => progressChecker(id, comidaOuBebida, `${ingredient}${index}`)
        };
        return <Checkbox key={`${ingredient}${index}`} data={data} />;
      })}
      <p data-testid="instructions" >{instructions}</p>
      <ButtonFinish data={{ redirecionar: () => setRedirect,
        redirState: redirect,
        recipe,
        unlock: () => shouldUnlock(ingredients, id, comidaOuBebida),
        }} />
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
