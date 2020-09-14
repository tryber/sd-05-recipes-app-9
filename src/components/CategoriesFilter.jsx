import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../services/api';
import { saveCategories } from '../actions';
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
  const [ isClicked, setIsClicked ] = useState(false);

  useEffect(() => {
    fetchData(match).then(r => dispatch(saveCategories(r)));
    
  },[match, dispatch])

  useEffect(() => {
    
    if (isClicked)
    {
    //   fetchRecipesByCategory(match.path, categoriesFilter)
    // .then(recipes => {
    //   // console.log('fetch cat')
    //   return recipes.meals ? dispatch(setRecipesByCategory(recipes.meals.slice(0, 12))) :
    //   dispatch(setRecipesByCategory(recipes.drinks.slice(0, 12)));
    // })
    // .catch(() => dispatch(setRecipesByCategory('')));
    setIsClicked(false);
  }
  }, [dispatch, match.path, categoriesFilter, isClicked]);

  return (
    <div>
      <CategoryButton categoryName="All" setIsClicked={setIsClicked} />
      {categories.map(category => <CategoryButton match={match} categoryName={category} key={category} setIsClicked={setIsClicked} isClicked={isClicked} />)}
    </div>
  );
}
