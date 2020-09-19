import React, { useState } from 'react';
import './receitasEmProcesso.css';

const riscaTexto = (id) => {
  //adiciona a classe textoRiscado no botão clicado
  document.getElementById(id).classList.add('textoRiscado');
};

const idKey = (localStorage, key, idElemento, id) => {
  //cria um objeto que inclui as chaves anteriores + a receita nova
  const retorno = localStorage[key];
  if (retorno[id]) {
    retorno[id] = [...retorno[id], idElemento];
    return retorno;
  }
  if (!retorno[id]) {
    retorno[id] = [idElemento];
    return retorno;
  }
};

const keyConstructor = (id, itensLocalStorage, idElemento, bemidas) => {
  //dependendo da rota, chama uma fução que adiciona a receita atual às receitas já prontas
  if (bemidas === 'comidas') {
    const newMeals = idKey(itensLocalStorage, 'meals', idElemento, id);
    return { meals: newMeals, cocktails: itensLocalStorage.cocktails }
  }
  if (bemidas === 'bebidas') {
    const newDrinks = idKey(itensLocalStorage, 'cocktails', idElemento, id);
    return { meals: itensLocalStorage.meals, cocktails: newDrinks }
  }
};


const Checkbox = ({ data }) => {
  const { ingredient, index, measure, comidaOuBebida, id } = data;

  const storeIngredients = () => {
    //chama a função que monta as chaves para mandar para o local storage
    const idElemento = `${ingredient}${index}`;
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

  const [checked, setChecked] = useState(false);
  return (
    <div key={`${ingredient}${measure}`}>
      <label htmlFor={`${ingredient}${index}`}
        id={`${ingredient}${index}${index}`}
        data-testid={`${index}-ingredient-step`}
      >
        <input
          className="textoNormal"
          id={`${ingredient}${index}`}
          type="checkbox"
          checked={checked}
          disabled={checked}
          value={`${ingredient}${index}`}
          onChange={() => {
            riscaTexto(`${ingredient}${index}${index}`);
            setChecked(!checked);
            storeIngredients();
          }}
        />{`${ingredient}${(measure === null) ? '' : ` - ${measure}`}`}
      </label>
    </div>
  );
};

export default Checkbox;
