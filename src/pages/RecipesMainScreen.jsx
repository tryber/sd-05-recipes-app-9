import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import BottomMenu from '../components/BottomMenu';
import { fetchMeals, fetchDrinks } from '../services/api';
import { saveRecipes } from '../actions';
import MainCard from '../components/MainCard';

async function fetchData(dispatch, setIsLoading) {
  setIsLoading(true);
  const meals = await fetchMeals('s', '').then(({ meals }) => meals);

  const drinks = await fetchDrinks('s', '').then(({ drinks }) => drinks);
  
  dispatch(saveRecipes(meals, drinks));
  setIsLoading(false);
  
}

function RecipesMainScreen(props) {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(dispatch, setIsLoading);
  }, [dispatch]);
  const { meals, drinks, match } = props;
  return (
      <div className="main-container">
        <div className="cards">
          { !isLoading && match.path === "/comidas" && meals.map(
            (meal, index) => index <= 11 &&<MainCard index={index} recipes={meal} key={meal.strMeal} />
          )}
          { !isLoading && match.path === "/bebidas" && drinks.map(
            (drink, index) => index <= 11 &&<MainCard index={index} recipes={drink} key={drink.strMeal} />
          )}
          { isLoading && <p>Loading...</p> }
        </div>
        <BottomMenu />
      </div>
    );
}

RecipesMainScreen.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object.isRequired),
};

const mapStateToProps = (state) => ({
  meals: state.recipesReducer.meals,
  drinks: state.recipesReducer.drinks,
});

export default connect(mapStateToProps)(RecipesMainScreen);
