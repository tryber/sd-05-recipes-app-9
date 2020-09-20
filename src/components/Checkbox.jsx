import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { destravar } from '../actions/finishRecipeButton';
import './receitasEmProcesso.css';

const riscaTexto = (id) => {
  // adiciona a classe textoRiscado no botão clicado
  const elemento = document.getElementById(id);
  elemento.classList.add('textoRiscado');
};

const idKey = (localStorage, key, idElemento, id) => {
  // cria um objeto que inclui as chaves anteriores + a receita nova
  const retorno = localStorage[key];
  if (retorno[id]) {
    retorno[id] = [...retorno[id], idElemento];
    return retorno;
  }
  if (!retorno[id]) {
    retorno[id] = [idElemento];
    return retorno;
  }
  return null;
};

const keyConstructor = (id, itensLocalStorage, idElemento, bemidas) => {
  // dependendo da rota, chama uma fução que adiciona a receita atual às receitas já prontas
  if (bemidas === 'comidas') {
    const newMeals = idKey(itensLocalStorage, 'meals', idElemento, id);
    return { meals: newMeals, cocktails: itensLocalStorage.cocktails };
  }
  if (bemidas === 'bebidas') {
    const newDrinks = idKey(itensLocalStorage, 'cocktails', idElemento, id);
    return { meals: itensLocalStorage.meals, cocktails: newDrinks };
  }
  return null;
};

const progressChecker = (id, comidaOuBebida, idElemento) => {
  // checa se o checkbox atual está marcado
  const inProgressRecipes = localStorage.getItem('inProgressRecipes') ?
  JSON.parse(localStorage.getItem('inProgressRecipes')) : false;
  const key = comidaOuBebida === 'comidas' ? 'meals' : 'cocktails';
  const categoriaAtual = inProgressRecipes[key];
  if (inProgressRecipes === false) return false;
  if (categoriaAtual[id] === undefined) return false;
  if (categoriaAtual[id].includes(idElemento)) {
    document.getElementById(idElemento).className = 'textoRiscado';
  }
  return categoriaAtual[id].includes(idElemento);
};

const Checkbox = ({ data }) => {
  const { ingredient, index, measure, comidaOuBebida, id, onChange } = data;
  const idElemento = `${ingredient}${index}`;
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();

  const storeIngredients = () => {
    // chama a função que monta as chaves para mandar para o local storage
    const inProgressRecipes = {
      cocktails: {},
      meals: {},
    };
    let itensLocalStorage = localStorage.getItem('inProgressRecipes');
    if (itensLocalStorage) {
      itensLocalStorage = JSON.parse(itensLocalStorage);
      const emProcesso = keyConstructor(id, itensLocalStorage, idElemento, comidaOuBebida);
      return localStorage.setItem('inProgressRecipes', JSON.stringify(emProcesso));
    }
    const chamadaInicial = keyConstructor(id, inProgressRecipes, idElemento, comidaOuBebida);
    return localStorage.setItem('inProgressRecipes', JSON.stringify(chamadaInicial));
  };
  useEffect(() => {
    setChecked(progressChecker(id, comidaOuBebida, idElemento));
  }, [id, comidaOuBebida, idElemento]);
  return (
    <div key={`${ingredient}${measure}`}>
      <label
        htmlFor={`${ingredient}${index}`}
        id={`${ingredient}${index}`}
        data-testid={`${index}-ingredient-step`}
      >
        <input
          className="textoNormal"
          id={`${ingredient}${index}`}
          type="checkbox"
          checked={checked}
          onChange={() => {
            riscaTexto(`${ingredient}${index}`);
            setChecked(!checked);
            storeIngredients();
            onChange();
            dispatch(destravar(onChange()));
          }}
          disabled={checked}
        />{`${ingredient}${(measure === null) ? '' : ` - ${measure}`}`}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default Checkbox;
