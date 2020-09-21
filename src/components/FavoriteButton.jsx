import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { storeFavorites, favoriteChecker } from '../services/localStorage';

const toggleTrueFalse = (bool, setTrueFalse) => (
  setTrueFalse(!bool)
);

const FavoriteButton = ({ recipe, id }) => {
  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {
    favoriteChecker(id, setFavoritado);
  }, [id]);
  return (
    <div className="favorite-button-main">
      <button
        onClick={() => {
          toggleTrueFalse(favoritado, setFavoritado);
          storeFavorites(favoritado, recipe);
        }}
      >
        <img
          data-testid="favorite-btn"
          src={favoritado ? blackHeartIcon : whiteHeartIcon} alt="love"
        />
      </button>
    </div>
  );
};

FavoriteButton.propTypes = {
  recipe: PropTypes.instanceOf(Object).isRequired,
  id: PropTypes.string.isRequired,
};

export default FavoriteButton;
