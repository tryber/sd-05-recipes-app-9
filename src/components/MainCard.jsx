import React from 'react';
import PropTypes from 'prop-types';

class MainCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { recipes, index } = this.props;

    return (
      <div data-testid={`${index}-recipe-card`} className="card">
        <img src={recipes.strMealThumb || recipes.strDrinkThumb} data-testid={`${index}-card-img`} alt="Card" />
        <p data-testid={`${index}-card-name`}>{recipes.strMeal || recipes.strDrink}</p>
      </div>
    );
  }
}

MainCard.propTypes = {
  recipes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default MainCard;
