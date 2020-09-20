import React, { useState, useEffect } from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { storeFavorites, favoriteChecker } from '../services/localStorage';

const toggleTrueFalse = (bool, setTrueFalse) => (
  setTrueFalse(!bool)
);

const FavoriteButton = ({ recipe, id }) => {
  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {
    favoriteChecker(id, setFavoritado)
  }, [id])
  return (
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
  );
}

export default FavoriteButton;