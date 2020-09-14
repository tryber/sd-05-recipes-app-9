import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Explorar from './pages/Explorar';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import RecipesMainScreen from './pages/RecipesMainScreen';
import Login from './pages/Login';

function App() {
  return (
    <div id="meals">
      <Switch>
        <Route path="/comidas" render={(props) => <RecipesMainScreen {...props} />} />
        <Route path="/bebidas" render={(props) => <RecipesMainScreen {...props} />} />
        <Route exact path="/explorar" render={(props) => <Explorar {...props} />} />
        <Route exact path="/explorar/comidas" render={(props) => <ExploreFood {...props} />} />
        <Route exact path="/explorar/bebidas" render={(props) => <ExploreDrink {...props} />} />
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
