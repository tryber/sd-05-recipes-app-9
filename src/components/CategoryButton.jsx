import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoriesFilter, selectCategory, loadingCategoryRecipes } from '../actions';
import { fetchRecipesByCategory } from '../services/api';

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
        data-testid={`${categoryName}-category-filter`}
        onClick={(event) => {
          verifyFetch(match, event, categoriesFetched, dispatch);
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
