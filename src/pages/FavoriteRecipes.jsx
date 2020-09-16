import React from 'react';
import Header from '../components/Header';
import FavoriteRecipesContent from '../components/FavoriteRecipesContent';

const FavoriteRecipes = (props) => (
  <div>
    <Header props={props} />
    <FavoriteRecipesContent />
  </div>
);

export default FavoriteRecipes;
