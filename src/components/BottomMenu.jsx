import React from 'react';
import { Link } from 'react-router-dom';
import drink from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import meal from '../images/mealIcon.svg';

function BottomMenu() {
  return (
    <div data-testid="footer">
      <Link to="/bebidas">
        <button data-testid="drinks-bottom-btn">
          <img src={drink} alt="Bebidas" />
        </button>
      </Link>
      <Link to="/explorar">
        <button data-testid="explore-bottom-btn">
          <img src={explore} alt="Explorar" />
        </button>
      </Link>
      <Link to="/comidas">
        <button data-testid="food-bottom-btn">
          <img src={meal} alt="Comidas" />
        </button>
      </Link>
    </div>
  );
}

export default BottomMenu;
