import React from 'react';
import Header from '../components/Header';
import Explore from '../components/Explore';

function Explorar(props) {
  return (
    <div>
      <Header props={props} />
      <Explore />
    </div>
  );
}

export default Explorar;
