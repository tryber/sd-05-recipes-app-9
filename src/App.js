import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import RecipesMainScreen from './pages/RecipesMainScreen';

function App() {
  return (
    <div id="meals">
      <Switch>
        <Route path="/comidas">
          <RecipesMainScreen />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
