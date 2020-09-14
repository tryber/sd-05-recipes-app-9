import React from 'react';
import Header from '../components/Header';
import ExploreContent from '../components/ExploreContent';

const ExploreFood = (props) => (
  <div>
    <Header props={props} />
    <ExploreContent props={props} />
  </div>
);

export default ExploreFood;
