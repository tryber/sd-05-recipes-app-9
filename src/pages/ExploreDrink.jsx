import React from 'react';
import Header from '../components/Header';
import ExploreContent from '../components/ExploreContent';
import BottomMenu from '../components/BottomMenu';


const ExploreDrink = (props) => (
  <div>
    <Header props={props} />
    <ExploreContent props={props} />
    <BottomMenu />
  </div>
);

export default ExploreDrink;
