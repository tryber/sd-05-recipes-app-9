import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import IngredientChecklist from '../components/IngredientChecklist';











const olhaCheckbox = (id, bemidas, ingrediente) => {
  let receitaAtual = localStorage.getItem('inProgressRecipes') ?
  JSON.parse(localStorage.getItem('inProgressRecipes')) : false;
  if (!receitaAtual || receitaAtual === undefined) return false;
  if (bemidas === 'comidas') {
    receitaAtual = receitaAtual.meals[id];
  }
  if (bemidas === 'bebidas') {
    receitaAtual = receitaAtual.cocktails[id];
  }
  return receitaAtual ? receitaAtual.includes(ingrediente) : false;
};

const unlockFinish = (id, ingredientData, bemidas, setDisabled) => {
  const receitaAtual = localStorage.getItem('inProgressRecipes') ?
  JSON.parse(localStorage.getItem('inProgressRecipes')) : false;
  const ingredientes = ingredientData.ingredients.filter((ing) => (ing !== '' && ing !== null));
  if (!receitaAtual) return setDisabled(true);
  let ingredientesAtuais = [];
  if (bemidas === 'comidas') {
    ingredientesAtuais = receitaAtual.meals[id];
  }
  if (bemidas === 'bebidas') {
    ingredientesAtuais = receitaAtual.cocktails[id];
  }
  if (ingredientesAtuais !== undefined && ingredientesAtuais.length === ingredientes.length) {
    return setDisabled(false);
  }
  return setDisabled(true);
};



const RecipeDetails = (props) => {
  const { recipe, location: { pathname } } = props;
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [favoritado, setFavoritado] = useState(false);
  const params = onCoTo(pathname);



  useEffect(() => {
    if (props.loading === false) {
      unlockFinish(params.id, ingredientData, params.bemidas, setDisabled);
    }
  }, [props.loading])

  const { ingredients, measures } = ingredientData;
  const checkSize = ingredients.filter((ingrediente) => ingrediente !== "" && ingrediente !== null).length;


  return (
    <div>
      
      
      {ingredients.map((ingredient, index) => {
        let checkboxIC = olhaCheckbox(params.id, params.bemidas, `${ingredient}${index}`);
        const data = {
          ingredient,
          measure: measures[index],
          onChange: () => (unlockFinish(params.id, ingredientData, params.bemidas, setDisabled)),
          id: params.id,
          bemidas: params.bemidas,
          checkbox: checkboxIC,
        }
       return <IngredientChecklist key={`${ingredient}${index}i`}index={index} data={data} />
      })}
      
    </div>
  );
};

