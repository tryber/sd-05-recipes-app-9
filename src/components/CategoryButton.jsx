import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoriesFilter } from '../actions';
// import { useEffect } from 'react';

export default function CategoryButton(props) {
  const { categoryName } = props;
  const dispatch = useDispatch();
  const categoriesFilter = useSelector(state => state.categoriesReducer.categoriesFilter);
  
  
  return (
    <div>
      <button
        data-testid={`${categoryName}-category-filter`}
        onClick={() => {
          return categoriesFilter === categoryName ?
          dispatch(setCategoriesFilter('All')) :
          dispatch(setCategoriesFilter(categoryName));
          }
        }
      >
        {categoryName}
      </button>
    </div>
  );
}
