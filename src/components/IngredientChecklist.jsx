import React, { useState } from 'react';
import './receitasEmProcesso.css';

const comidas = (meals, idElemento, id) => {
  const retorno = meals;
  if (retorno[id]) {
    retorno[id] = [...retorno[id], idElemento];
    return retorno;
  }
  if (!retorno[id]) {
    retorno[id] = [idElemento];
    return retorno;
  }
};

const bebidas = (cocktails, idElemento, id) => {
  const retorno = cocktails;
  if (retorno[id]) {
    retorno[id] = [...retorno[id], idElemento];
    return retorno;
  }
  if (!retorno[id]) {
    retorno[id] = [idElemento];
    return retorno;
  }
}

const keyConstructor = (id, itensLocalStorage, idElemento, bemidas) => {
  if (bemidas === 'comidas') {
    const newMeals = comidas(itensLocalStorage.meals, idElemento, id);
    return { meals: newMeals, cocktails: itensLocalStorage.cocktails }
  }
  if (bemidas === 'bebidas') {
    const newDrinks = bebidas(itensLocalStorage.cocktails, idElemento, id);
    return { meals: itensLocalStorage.meals, cocktails: newDrinks }
  }
};

const boolChecker = (checado, setChecado, busca, idElemento) => {
  if (busca) {
    document.getElementById(idElemento).classList.add('textoRiscado');
    setChecado(!checado);
  }
};

const progressChecker = (checado, setChecado, id, bemidas, idElemento) => {
  let emProgresso = localStorage.getItem('inProgressRecipes');
  emProgresso = JSON.parse(emProgresso);
  if (emProgresso && emProgresso.meals[id] && bemidas === 'comidas') {
    const busca = emProgresso.meals[id].find((elementId) => elementId === idElemento);
    boolChecker(checado, setChecado, busca, idElemento);
  }
  if (emProgresso && emProgresso.cocktails[id] && bemidas === 'bebidas') {
    const busca = emProgresso.cocktails[id].find((elementId) => elementId === idElemento);
    boolChecker(checado, setChecado, busca, idElemento);
  }
  return null;
};

const IngredientChecklist = ({ data, index }) => {
  const { ingredient, measure, onChange, id, bemidas, checkbox } = data;
  console.log(checkbox)
  const [checado, setChecado] = useState(false);
  const idElemento = `${ingredient}${index}`;

  // const done = document.getElementsByClassName('textoRiscado').length;

  // const toggler = (checado) => (setChecado(!checado));

  // useEffect(() => {
  //   if (done === ingredientsSize) onChange();
  // }, [done]);

  const storeIngredients = () => {
    const idElemento = `${ingredient}${index}`;
    const inProgressRecipes = {
      cocktails: {},
      meals: {},
    };
    let itensLocalStorage = localStorage.getItem('inProgressRecipes');
    if (itensLocalStorage) {
      itensLocalStorage = JSON.parse(itensLocalStorage);
      const emProcesso = keyConstructor(id, itensLocalStorage, idElemento, bemidas);
      return localStorage.setItem('inProgressRecipes', JSON.stringify(emProcesso));
    }
    const chamadaInicial = keyConstructor(id, inProgressRecipes, idElemento, bemidas);
    return localStorage.setItem('inProgressRecipes', JSON.stringify(chamadaInicial));
  };

  const riscaTexto = (checado) => {
    if (checado) return document.getElementById(`${ingredient}`).classList.remove('textoRiscado');
    document.getElementById(`${ingredient}${index}`).className='textoRiscado';
  };
  if (ingredient && ingredient !== '') {
    return (
      <div className="ingredientContainer">
        <label id={`${ingredient}${index}`} data-testid={`${index}ingredient-step`} >
          <input type="checkbox"
            disabled={checkbox}
            value={`${ingredient}`}
            checked={checkbox} onChange={() => {
              riscaTexto(checkbox);
              storeIngredients();
              onChange();
            }}
          />{`${ingredient}${(measure === null) ? '' : ` - ${measure}`}`}
        </label>
      </div>
    );
  }
  return null;
}
export default IngredientChecklist;

/*
colocar todos os data-testids, nos lugares certos
criar um componente checkbox, e criar a lista de ingredientes nele
criar uma fun????o para riscar o texto dos checkbox marcado
a base da page vai ser a pagina de detalhes da receita com a lista de ingredientes substituida pelo checkbox
uma função que checa se todos os checkbox estao marcados antes de liberar o botão de finalizar a receita
botão finalizar receita deve redirecionar para a pagina de receitas feitas
*/