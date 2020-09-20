import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../services/api';
import { saveCategories } from '../actions';
import CategoryButton from './CategoryButton';
import './CategoriesFilter.css';

function fetchData(match) {
  return (
    fetchCategories(match.path)
      .then((res) =>
        (res.meals ?
          res.meals.map((meal) => meal.strCategory) :
          res.drinks.map((drink) => drink.strCategory)),
    )
  );
}

export default function CategoriesFilter(props) {
  const dispatch = useDispatch();
  const { match } = props;
  const categories = useSelector((state) => state.categoriesReducer.categories);
  useEffect(() => {
    fetchData(match).then((r) => dispatch(saveCategories(r)));
  }, [match, dispatch]);

  return (
    <div className="categories-buttons">
      <CategoryButton categoryName="All" match={match} />
      {categories.map((category) =>
        <CategoryButton match={match} categoryName={category} key={category} />)}
    </div>
  );
}

CategoriesFilter.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
