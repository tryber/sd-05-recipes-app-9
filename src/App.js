import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import RecipesMainScreen from './pages/RecipesMainScreen';
import Login from './pages/Login';

function App() {
  return (
    <div id="meals">
      <Switch>
        <Route path="/comidas" render={(props) => <RecipesMainScreen {...props} />} />
        <Route path="/bebidas" render={(props) => <RecipesMainScreen {...props} />} />
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
