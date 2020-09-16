import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { randomFood, randomDrink } from '../services/api';
import './ExploreContent.css';

const contentHtml = (handleClickIngredient, notVisible, handleClickArea, handleClickSurprise) => (
  <div className="buttons-container">
    <button
      className="explore-button" data-testid="explore-by-ingredient"
      onClick={handleClickIngredient}
    >
      Por Ingredientes
    </button>
    {(!notVisible) && <button
      className={(notVisible) ? 'notVisible' : 'explore-button'}
      data-testid="explore-by-area" onClick={handleClickArea}
    >
      Por Local de Origem
    </button>
    }
    <button
      className="explore-button" data-testid="explore-surprise" onClick={handleClickSurprise}
    >
      Me Surpreenda!
    </button>
  </div>
);

const ExploreContent = (props) => {
  const { location: { pathname } } = props.props;
  const notVisible = pathname.includes('bebidas');
  const [redirect, setRedirect] = useState(false);
  const [pathRedirect, setPathRedirect] = useState('');
  const [initFetch, setInitFetch] = useState(false);
  const isItFood = pathname.includes('comidas');

  const handleClickIngredient = () => {
    setPathRedirect((isItFood) ? '/explorar/comidas/ingredientes' : '/explorar/bebidas/ingredientes');
    setRedirect(true);
  };

  const handleClickArea = () => {
    setPathRedirect('/explorar/comidas/area');
    setRedirect(true);
  };
  const handleClickSurprise = () => {
    setInitFetch(true);
  };

  useEffect(() => {
    if (initFetch === true) {
      if (isItFood) {
        randomFood().then((data) => {
          setPathRedirect(`/comidas/${data.meals[0].idMeal}`);
          setRedirect(true);
        });
      }
      if (!isItFood) {
        randomDrink().then((data) => {
          setPathRedirect(`/bebidas/${data.drinks[0].idDrink}`);
          setRedirect(true);
        });
      }
    }
  }, [initFetch, isItFood]);

  if (redirect) return (<Redirect to={pathRedirect} />);

  return contentHtml(handleClickIngredient, notVisible, handleClickArea, handleClickSurprise);
};

export default ExploreContent;

ExploreContent.propTypes = {
  props: PropTypes.objectOf(PropTypes.object).isRequired,
};
