import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import Teste from './components/TesteTelaReceitaEmProgresso';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/comidas/:id" component={RecipeDetails} />
        <Route exact path="/bebidas/:id" component={RecipeDetails} />
        <Route path="/in-progress" component={Teste} />
      </Switch>
    </div>
  );
}

export default App;
