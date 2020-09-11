import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, connect, useSelector } from 'react-redux';
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

// function filterRecipesByCategory(recipes, categoriesFilter, recipesByCategory) {
//   console.log(recipesByCategory)
//   return categoriesFilter === 'All' ?
//   recipes :
//   recipesByCategory || recipes;
// }

function renderMeals(meals, isLoading, match, recipesByCategory) {
  return (
    !isLoading &&
    match.path === "/comidas" &&
    (recipesByCategory ?
      (recipesByCategory.map((meal, index) =>
        <MainCard index={index} recipes={meal} key={meal.strMeal} />)) :
      meals.map((meal, index) => <MainCard index={index} recipes={meal} key={meal.strMeal} />)
    )
  );
}

function renderDrinks(drinks, isLoading, match, recipesByCategory) {
  return (
    !isLoading &&
    match.path === "/bebidas" &&
    (recipesByCategory ?
      (recipesByCategory.map((drink, index) =>
        <MainCard index={index} recipes={drink} key={drink.strDrink} />)) :
      drinks.map((drink, index) => <MainCard index={index} recipes={drink} key={drink.strDrink} />)
    )
  );
}

function RecipesMainScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(dispatch, setIsLoading);
  }, [dispatch]);
  const { meals, drinks, match, recipesByCategory } = props;
  return (
      <div className="main-container">
        <CategoriesFilter match={match} />
        <div className="cards">
          {renderMeals(meals, isLoading, match, recipesByCategory)}
          {renderDrinks(drinks, isLoading, match, recipesByCategory)}
          { isLoading && <p>Loading...</p> }
        </div>
        <BottomMenu />
      </div>
    );
}

const mapStateToProps = (state) => ({
  meals: state.recipesReducer.meals,
  drinks: state.recipesReducer.drinks,
  recipesByCategory: state.categoriesReducer.recipesByCategory,
  categoriesFilter: state.categoriesReducer.categoriesFilter,
});

RecipesMainScreen.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default connect(mapStateToProps)(RecipesMainScreen);
