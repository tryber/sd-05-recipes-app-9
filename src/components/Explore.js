import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Explore.css';

const Explore = () => {
  const [redirect, setRedirect] = useState(false);
  const [pathRedirect, setPathRedirect] = useState('');

  const onClickFood = () => {
    setPathRedirect('/comidas');
    setRedirect(true);
  };

  const onClickDrinks = () => {
    setPathRedirect('/bebidas');
    setRedirect(true);
  };

  if (redirect) return (<Redirect to={pathRedirect} />);
  return (
    <div className="buttons-container">
      <button
        data-testid="explore-food" className="explore-button"
        onClick={onClickFood}
      >
        Explorar Comidas
      </button>
      <button
        data-testid="explore-drinks" className="explore-button"
        onClick={onClickDrinks}
      >
        Explorar Bebidas
      </button>
    </div>
  );
};

export default Explore;
