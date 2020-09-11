import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchRecipesByCategory } from '../services/api';
import { saveCategories, setRecipesByCategory } from '../actions';
import CategoryButton from './CategoryButton';

function fetchData(match) {
 return (
  fetchCategories(match.path).then(res => {
    return res.meals ?
    res.meals.map(meal => meal.strCategory) :
    res.drinks.map(drink => drink.strCategory)
  })
 );
}

export default function CategoriesFilter(props) {
  const dispatch = useDispatch();
  const { match } = props;
  const categories = useSelector(state => state.categoriesReducer.categories);
  const categoriesFilter = useSelector(state => state.categoriesReducer.categoriesFilter);
  useEffect(() => {
    fetchData(match).then(r => dispatch(saveCategories(r)));
    
  },[match, dispatch])

  useEffect(() => {
    fetchRecipesByCategory(match.path, categoriesFilter)
    .then(recipes => {
      return recipes.meals ? dispatch(setRecipesByCategory(recipes.meals.slice(0, 12))) :
      dispatch(setRecipesByCategory(recipes.drinks.slice(0, 12)));
    })
    .catch(() => dispatch(setRecipesByCategory('')))
  }, [dispatch, match.path, categoriesFilter]);

  return (
    <div>
      <CategoryButton categoryName="All" />
      {categories.map(category => <CategoryButton categoryName={category} key={category} />)}
    </div>
  );
}
