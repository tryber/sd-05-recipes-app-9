import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import DropDownArea from '../components/DropDownArea';
import Header from '../components/Header';
import { fetchRecipesByArea, fetchMeals } from '../services/api';
import { recipesByArea, saveRecipes } from '../actions';
import MainCard from '../components/MainCard';
import NotFound from './NotFound';
import BottomMenu from '../components/BottomMenu';
import './ExploreByArea.css';
import loader from '../images/loader1.gif';

async function fetchData(dispatch, setIsLoading) {
  setIsLoading(true);
  const mealsFetched = await fetchMeals('s', '').then(({ meals }) => meals.slice(0, 12));
  dispatch(saveRecipes(mealsFetched, []));
  setIsLoading(false);
}

export default function ExploreByArea(props) {
  const { match } = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedArea = useSelector((state) => state.exploreByAreaReducer.selectedArea);
  const mealsRecipes = useSelector((state) => state.recipesReducer.meals);
  const mealsRecipesByArea = useSelector((state) => state.exploreByAreaReducer.recipes);
  useEffect(() => {
    fetchData(dispatch, setIsLoading);
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    fetchRecipesByArea(selectedArea).then((recipes) =>
      ((recipes.meals) ?
      dispatch(recipesByArea(recipes.meals.slice(0, 12))) :
      dispatch(recipesByArea(recipes.meals))),
    ).then(() => setIsLoading(false));
  }, [selectedArea, dispatch]);

  return (
    <div>
      <Header props={props} />
      <DropDownArea />
      <div className="explore-main-container">
        {
          !isLoading && match.path === '/explorar/comidas/area' &&
          (mealsRecipesByArea !== null ?
            mealsRecipesByArea.map((recipe, index) =>
              <MainCard recipe={recipe} index={index} match="/comidas" key={recipe.strMeal} />) :
            mealsRecipes.map((recipe, index) =>
              <MainCard recipe={recipe} index={index} match="/comidas" key={recipe.strMeal} />))
        }
        {!isLoading && match.path === '/explorar/bebidas/area' && <NotFound />}
        {isLoading && <img className="loader" alt="loader" src={loader} />}
      </div>
      <BottomMenu />
    </div>
  );
}

ExploreByArea.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
