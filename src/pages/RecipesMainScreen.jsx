import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import BottomMenu from '../components/BottomMenu';
import { fetchMeals, fetchDrinks, fetchIngredientsMeals, fetchIngredientsDrinksWithoutText } from '../services/api';
import { saveRecipes, receiveDataIngredientsMeal, receiveDataIngredientsDrink } from '../actions';
import MainCard from '../components/MainCard';
import CategoriesFilter from '../components/CategoriesFilter';
import Header from '../components/Header';
import './RecipesMainScreen.css';
import loader from '../images/loader1.gif';

async function fetchData(dispatch, setIsLoading) {
  setIsLoading(true);
  const mealsFetched = await fetchMeals('s', '').then(({ meals }) => meals.slice(0, 12));
  const drinksFetched = await fetchDrinks('s', '').then(({ drinks }) => drinks.slice(0, 12));
  dispatch(saveRecipes(mealsFetched, drinksFetched));
  setIsLoading(false);
}

function RenderMeals(props) {
  const { match } = props;
  const meals = useSelector((state) => state.recipesReducer.meals);
  const recipesByCategory = useSelector((state) => state.categoriesReducer.categoriesFilter);
  const selectedCategory = useSelector((state) => state.categoriesReducer.selectedCategory);
  const loadingCategory = useSelector((state) => state.categoriesReducer.isLoading);
  return (
    selectedCategory === 'All' ?
      !loadingCategory &&
      meals
        .map((meal, index) =>
          <MainCard index={index} recipe={meal} key={meal.strMeal} match={match.path} />)
      :
      !loadingCategory &&
      recipesByCategory
        .filter((recipe) => recipe.category === selectedCategory)[0].recipes
        .map((meal, index) =>
          <MainCard index={index} recipe={meal} key={meal.strMeal} match={match.path} />)
  );
}

function RenderDrinks(props) {
  const { match } = props;
  const drinks = useSelector((state) => state.recipesReducer.drinks);
  const recipesByCategory = useSelector((state) => state.categoriesReducer.categoriesFilter);
  const selectedCategory = useSelector((state) => state.categoriesReducer.selectedCategory);
  const loadingCategory = useSelector((state) => state.categoriesReducer.isLoading);
  return (
    selectedCategory === 'All' ?
      !loadingCategory &&
      drinks.map((drink, index) =>
        <MainCard index={index} recipe={drink} key={drink.strDrink} match={match.path} />)
      :
      !loadingCategory &&
      recipesByCategory
        .filter((recipe) => recipe.category === selectedCategory)[0].recipes
        .map((drink, index) =>
          <MainCard index={index} recipe={drink} key={drink.strDrink} match={match.path} />)
  );
}

export default function RecipesMainScreen(props) {
  const { match, location: { state } } = props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isItFood = match.path.includes('/comidas');
  const isItDrink = match.path.includes('/bebidas');
  useEffect(() => {
    if (state && isItFood) {
      setIsLoading(true);
      fetchIngredientsMeals(state).then((data) => {
        dispatch(receiveDataIngredientsMeal(data));
        setIsLoading(false);
      });
    }
    if (state && isItDrink) {
      setIsLoading(true);
      fetchIngredientsDrinksWithoutText(state).then((data) => {
        dispatch(receiveDataIngredientsDrink(data));
        setIsLoading(false);
      });
    }
    if (!state) fetchData(dispatch, setIsLoading);
  }, [dispatch, state, isItFood, isItDrink]);

  const headerMeals = useSelector((stateRedux) => stateRedux.reducerHeaderMeals.data);
  const headerDrinks = useSelector((stateRedux) => stateRedux.reducerHeaderDrinks.data);
  return (
    <div className="main-container">
      <Header props={props} />
      <CategoriesFilter match={match} />
      <div className="cards">
        {!isLoading && isItFood && ((headerMeals.length > 0) ?
          headerMeals.map((meal, index) =>
            <MainCard index={index} recipe={meal} key={meal.strMeal} match={match.path} />) :
          <RenderMeals match={match} />)
        }
        {!isLoading && isItDrink && ((headerDrinks.length > 0) ?
          headerDrinks.map((drink, index) =>
            <MainCard index={index} recipe={drink} key={drink.strDrink} match={match.path} />) :
          <RenderDrinks match={match} />)
        }
        {isLoading && <img className="loader" alt="loader" src={loader} />}
      </div>
      <BottomMenu />
    </div>
  );
}

RecipesMainScreen.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};
