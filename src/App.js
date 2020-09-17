import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Explorar from './pages/Explorar';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import RecipesMainScreen from './pages/RecipesMainScreen';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import Perfil from './pages/Profile';
import ReceitasEmProcesso from './pages/ReceitasEmProcesso';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/comidas" render={(props) => <RecipesMainScreen {...props} />} />
        <Route exact path="/bebidas" render={(props) => <RecipesMainScreen {...props} />} />
        <Route exact path="/explorar" render={(props) => <Explorar {...props} />} />
        <Route exact path="/explorar/comidas" render={(props) => <ExploreFood {...props} />} />
        <Route exact path="/explorar/bebidas" render={(props) => <ExploreDrink {...props} />} />
        <Route exact path="/comidas/:id" component={RecipeDetails} />
        <Route exact path="/bebidas/:id" component={RecipeDetails} />
        <Route path="/bebidas/:id/in-progress" component={ReceitasEmProcesso} />
        <Route path="/comidas/:id/in-progress" component={ReceitasEmProcesso} />
        <Route exact path="/perfil" component={Perfil} />
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
