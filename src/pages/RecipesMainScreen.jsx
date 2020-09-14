import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import BottomMenu from '../components/BottomMenu';
import { fetchMeals, fetchDrinks } from '../services/api';
import { saveRecipes } from '../actions';
import MainCard from '../components/MainCard';
import CategoriesFilter from '../components/CategoriesFilter';

async function fetchData(dispatch, setIsLoading) {
  setIsLoading(true);
  const meals = await fetchMeals('s', '').then(({ meals }) => meals.slice(0, 12));
  const drinks = await fetchDrinks('s', '').then(({ drinks }) => drinks.slice(0, 12));
  dispatch(saveRecipes(meals, drinks));
  setIsLoading(false);
}

function RenderMeals(props) {
  const { match } = props;
  const meals = useSelector(state => state.recipesReducer.meals);
  const recipesByCategory = useSelector(state => state.categoriesReducer.categoriesFilter);
  const selectedCategory = useSelector(state => state.categoriesReducer.selectedCategory);
  const loadingCategory = useSelector(state => state.categoriesReducer.isLoading);
  return (
    selectedCategory === "All" ?
      !loadingCategory &&
      meals
        .map((meal, index) =>
          <MainCard index={index} recipe={meal} key={meal.strMeal} match={match.path} />)
      :
      !loadingCategory &&
      recipesByCategory
        .filter(recipe => recipe.category === selectedCategory)[0].recipes
        .map((meal, index) =>
          <MainCard index={index} recipe={meal} key={meal.strMeal} match={match.path} />)
  );
}

function RenderDrinks(props) {
  const { match } = props;
  const drinks = useSelector(state => state.recipesReducer.drinks);
  const recipesByCategory = useSelector(state => state.categoriesReducer.categoriesFilter);
  const selectedCategory = useSelector(state => state.categoriesReducer.selectedCategory);
  const loadingCategory = useSelector(state => state.categoriesReducer.isLoading);
  return (
    selectedCategory === "All" ?
      !loadingCategory &&
      drinks.map((drink, index) =>
        <MainCard index={index} recipe={drink} key={drink.strDrink} match={match.path} />)
      :
      !loadingCategory &&
      recipesByCategory
        .filter(recipe => recipe.category === selectedCategory)[0].recipes
        .map((drink, index) =>
          <MainCard index={index} recipe={drink} key={drink.strDrink} match={match.path} />)
  );
}

export default function RecipesMainScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(dispatch, setIsLoading);
  }, [dispatch]);
  const { match } = props;
  console.log(match, isLoading)
  return (
    <div className="main-container">
      <CategoriesFilter match={match} />
      <div className="cards">
        {!isLoading &&
          match.path === '/comidas' ?
          <RenderMeals match={match} /> :
          false
        }
        {!isLoading &&
          match.path === '/bebidas' ?
          <RenderDrinks match={match} /> :
          false
        }
        {isLoading && <p>Loading...</p>}
      </div>
      <BottomMenu />
    </div>
  );
}

RecipesMainScreen.propTypes = {
  match: PropTypes.object.isRequired,
};
