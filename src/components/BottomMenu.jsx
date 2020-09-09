import React from 'react';
import drink from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import meal from '../images/mealIcon.svg';
import { Link } from 'react-router-dom';

const BottomMenu = () => {
  return (
    <div data-testid="footer">      
      <Link to="/bebidas"><button data-testid="drinks-bottom-btn"><img src={drink} alt="Explorer" /></button></Link>
      <Link to="/explorar"><button data-testid="explore-bottom-btn"><img src={explore} alt="Explorer" /></button></Link>
      <Link to="/comidas"><button data-testid="food-bottom-btn"><img src={meal} alt="Explorer" /></button></Link>
    </div>
  );
};

export default BottomMenu;
