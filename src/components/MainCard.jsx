import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './MainCard.css';

class MainCard extends React.Component {
  render() {
    const { recipe, index, match } = this.props;
    return (
      <Link to={`${match}/${recipe.idMeal || recipe.idDrink}`} className="card">
        <div data-testid={`${index}-recipe-card`}>
          <img src={recipe.strMealThumb || recipe.strDrinkThumb} data-testid={`${index}-card-img`} alt="Card" />
          <p data-testid={`${index}-card-name`}>{recipe.strMeal || recipe.strDrink}</p>
        </div>
      </Link>
    );
  }
}

MainCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  match: PropTypes.string.isRequired,
};

export default MainCard;
