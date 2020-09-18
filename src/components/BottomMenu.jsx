import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import drink from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import meal from '../images/mealIcon.svg';
import { resetCategories } from '../actions';
import './BottomMenu.css';

function BottomMenu() {
  const dispatch = useDispatch();
  return (
    <div data-testid="footer" className="menu">
      <div>
        <Link to="/bebidas">
          <button
            onClick={() => dispatch(resetCategories())}
          >
            <img src={drink} alt="Bebidas" data-testid="drinks-bottom-btn" />
          </button>
        </Link>
      </div>
      <div>
        <Link to="/explorar">
          <button
            onClick={() => dispatch(resetCategories())}
          >
            <img src={explore} alt="Explorar" data-testid="explore-bottom-btn" />
          </button>
        </Link>
      </div>
      <div>
        <Link to="/comidas">
          <button
            onClick={() => dispatch(resetCategories())}
          >
            <img src={meal} alt="Comidas" data-testid="food-bottom-btn" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BottomMenu;
