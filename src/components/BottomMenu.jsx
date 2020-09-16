import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import drink from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import meal from '../images/mealIcon.svg';
import { resetCategories } from '../actions';

function BottomMenu() {
  const dispatch = useDispatch();
  return (
    <div data-testid="footer" className="menu">
      <div>
        <Link to="/bebidas">
          <button
            onClick={() => dispatch(resetCategories())}
            data-testid="drinks-bottom-btn"
          >
            <img src={drink} alt="Bebidas" />
          </button>
        </Link>
      </div>
      <div>
        <Link to="/explorar">
          <button
            onClick={() => dispatch(resetCategories())}
            data-testid="explore-bottom-btn"
          >
            <img src={explore} alt="Explorar" />
          </button>
        </Link>
      </div>
      <div>
        <Link to="/comidas">
          <button
            onClick={() => dispatch(resetCategories())}
            data-testid="food-bottom-btn"
          >
            <img src={meal} alt="Comidas" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BottomMenu;
