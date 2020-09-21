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
import loader from '../images/loader1.gif';

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
  if (!inProgressRecipes[key]) return false;
  if (inProgressRecipes[key][idAtual]) return true;
  return false;
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
  if (props.loading) return <div className="loader-main"><img className="loader" alt="loader" src={loader} /></div>;
  if (redirectProgresso) return <Redirect to={`${pathname}/in-progress`} />;
  return (
    <div className="details-main-container">
      <img className="details-main-image" data-testid="recipe-photo" src={recipeThumb} style={{ width: '100%' }} alt="receita" />
      <div className="details-text-container">
        <div className="name-and-share">
          <div className="name-and-share-title">
            <h1 data-testid="recipe-title">{drinkOrFood}</h1>
          </div>
          <div className="share-fav">
            <ShareButton pathname={pathname} />
            <FavoriteButton recipe={recipe} id={id} />
          </div>
        </div>
        <h2 className="details-cat" data-testid="recipe-category">{category}</h2>
        <h2 className="details-subtitle">Ingredients</h2>
        <div className="details-ingredients">
          {(ingredientData) && <Lista data={ingredientData} />}
        </div>
        <h2 className="details-subtitle">Instructions</h2>
        <p className="details-instructions" data-testid="instructions" >{instructions}</p>
        {(video) && <h2 className="details-subtitle">Video</h2>}
        {(video) && videoEmbeder(video)}
        <h2 className="details-subtitle">Recomendations</h2>
        <Recomedations data={{id, bemidas}} />
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          disabled={isItDone(id)}
          onClick={() => toggleTrueFalse(redirectProgresso, setRedirectProgresso)}
        >{isItInProgress(bemidas, id) ? 'Continuar Receita' : 'Start recipe'}
        </button>
      </div>
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
