import React from 'react';
import Header from '../components/Header';
import Explore from '../components/Explore';
import BottomMenu from '../components/BottomMenu';

function Explorar(props) {
  return (
    <div>
      <Header props={props} />
      <Explore />
      <BottomMenu />
    </div>
  );
}

export default Explorar;
