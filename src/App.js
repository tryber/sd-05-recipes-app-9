import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import RecipesMainScreen from './pages/RecipesMainScreen';

function App() {
  return (
    <div id="meals">
      <Switch>
        <Route path="/comidas" component={RecipesMainScreen} />
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
