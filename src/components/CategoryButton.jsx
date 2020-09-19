import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoriesFilter, selectCategory, loadingCategoryRecipes, isCategoryFiltered, clearDataMeals, clearDataDrinks } from '../actions';
import { fetchRecipesByCategory } from '../services/api';
import './CategoryButton.css';

function fetchData(match, category, dispatch) {
  dispatch(loadingCategoryRecipes(true));
  return category !== 'All' ?
  fetchRecipesByCategory(match.path, category)
    .then((recipes) =>
      (recipes.meals ?
      dispatch(setCategoriesFilter(category, recipes.meals.slice(0, 12))) :
      dispatch(setCategoriesFilter(category, recipes.drinks.slice(0, 12)))),
    )
    .then(() => dispatch(loadingCategoryRecipes(false)))
    .catch(() => dispatch(setCategoriesFilter(''))) :
    dispatch(loadingCategoryRecipes(false));
}

function verifyFetch(match, event, categoriesFetched, dispatch) {
  return !categoriesFetched.filter((cat) =>
  cat.category === event.target.name).length > 0 && fetchData(match, event.target.name, dispatch);
}

export default function CategoryButton(props) {
  const { categoryName, match } = props;
  const dispatch = useDispatch();
  const categoriesFetched = useSelector((state) => state.categoriesReducer.categoriesFilter);
  const selectedCategory = useSelector((state) => state.categoriesReducer.selectedCategory);

  return (
    <div>
      <button
        className="category-button-filter"
        data-testid={`${categoryName}-category-filter`}
        onClick={(event) => {
          verifyFetch(match, event, categoriesFetched, dispatch);
          match.path === '/comidas' ?
          dispatch(clearDataMeals()) : dispatch(clearDataDrinks());
          dispatch(isCategoryFiltered(true));
          return (event.target.name === selectedCategory) ?
          dispatch(selectCategory('All')) :
          dispatch(selectCategory(event.target.name));
        }}
        name={categoryName}
      >
        {categoryName}
      </button>
    </div>
  );
}

CategoryButton.propTypes = {
  categoryName: PropTypes.string.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
