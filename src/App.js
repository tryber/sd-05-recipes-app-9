import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Explorar from './pages/Explorar';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import RecipesMainScreen from './pages/RecipesMainScreen';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import ReceitasEmProcesso from './pages/ReceitasEmProcesso';
// import Teste from './components/TesteTelaReceitaEmProgresso';
import ExploreIngredients from './pages/ExploreIngredients';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Perfil from './pages/Profile';
import ExploreByArea from './pages/ExploreByArea';
import NotFound from './pages/NotFound';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <div className="app--main-structure">
      <Switch>
        <Route
          exact path="/explorar/comidas/area"
          render={(props) => <ExploreByArea {...props} />}
        />
        <Route exact path="/explorar/bebidas/area" render={(props) => <NotFound {...props} />} />
        <Route exact path="/receitas-feitas" render={(props) => <DoneRecipes {...props} />} />
        <Route exact path="/comidas" render={(props) => <RecipesMainScreen {...props} />} />
        <Route exact path="/bebidas" render={(props) => <RecipesMainScreen {...props} />} />
        <Route exact path="/explorar" render={(props) => <Explorar {...props} />} />
        <Route exact path="/explorar/comidas" render={(props) => <ExploreFood {...props} />} />
        <Route exact path="/explorar/bebidas" render={(props) => <ExploreDrink {...props} />} />
        <Route exact path="/receitas-favoritas" component={FavoriteRecipes} />
        <Route exact path="/comidas/:id" component={RecipeDetails} />
        <Route exact path="/bebidas/:id" component={RecipeDetails} />
        <Route path="/bebidas/:id/in-progress" component={ReceitasEmProcesso} />
        <Route path="/comidas/:id/in-progress" component={ReceitasEmProcesso} />
        <Route exact path="/explorar/comidas/ingredientes" component={ExploreIngredients} />
        <Route exact path="/explorar/bebidas/ingredientes" component={ExploreIngredients} />
        <Route exact path="/perfil" component={Perfil} />
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
