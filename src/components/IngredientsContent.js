import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchAllIngredientsMeals, fetchAllIngredientsDrinks } from '../services/api';
import MainCardExplore from './MainCardExplore';

const IngredientsContent = (props) => {
  const { location: { pathname } } = props.props;
  const isItFood = pathname.includes('comidas');
  const isItDrinks = pathname.includes('bebidas');
  const [dataFood, setDataFood] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isItFood && loading) {
      fetchAllIngredientsMeals().then((data) => {
        setDataFood(data.meals.slice(0, 12));
        setLoading(false);
      });
    }
    if (isItDrinks && loading) {
      fetchAllIngredientsDrinks().then((data) => {
        setDataDrinks(data.drinks.slice(0, 12));
        setLoading(false);
      });
    }
  }, [isItDrinks, isItFood, loading]);

  if (loading) return (<div>Loading...</div>);
  if (dataFood.length > 0) {
    return (
      <div>
        { dataFood.map((meal, index) =>
          <MainCardExplore index={index} recipe={meal} key={meal.strIngredient} match={'comidas'} />)
        }
      </div>
    );
  }
  return (
    <div>
      {dataDrinks.map((drink, index) =>
        <MainCardExplore index={index} recipe={drink} key={drink.strIngredient1} match={'bebidas'} />)
      }
    </div>
  );
};

export default IngredientsContent;

IngredientsContent.propTypes = {
  props: PropTypes.objectOf(PropTypes.object).isRequired,
};
