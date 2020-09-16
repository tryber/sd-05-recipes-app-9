import React from 'react';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import IngredientsContent from '../components/IngredientsContent';

const ExploreIngredients = (props) => (
  <div>
    <Header props={props} />
    <IngredientsContent props={props} />
    <BottomMenu />
  </div>
);

export default ExploreIngredients;
