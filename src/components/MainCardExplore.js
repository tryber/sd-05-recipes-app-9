import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MainCardExplore.css';

const MainCardExplore = (props) => {
  const { recipe, index, match } = props;
  const isItFood = match.includes('comidas');
  const ingrediente = recipe.strIngredient || recipe.strIngredient1;

  if (isItFood) {
    return (
      <Link to={{ pathname: `/${match}`, state: ingrediente }}>
        <button data-testid={`${index}-ingredient-card`} className="card">
          <img src={`https://www.themealdb.com/images/ingredients/${ingrediente}-Small.png`} data-testid={`${index}-card-img`} alt="Card" />
          <p data-testid={`${index}-card-name`}>{ingrediente}</p>
        </button>
      </Link>
    );
  }
  return (
    <Link to={{ pathname: `/${match}`, state: ingrediente }}>
      <button data-testid={`${index}-ingredient-card`} className="card">
        <img src={`https://www.thecocktaildb.com/images/ingredients/${ingrediente}-Small.png`} data-testid={`${index}-card-img`} alt="Card" />
        <p data-testid={`${index}-card-name`}>{ingrediente}</p>
      </button>
    </Link>
  );
};

MainCardExplore.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  match: PropTypes.string.isRequired,
};

export default MainCardExplore;
