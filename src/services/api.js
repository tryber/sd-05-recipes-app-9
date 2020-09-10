export function fetchMeals(tipo, input) {
  //  tipo = s => nome da receita
  //  tipo = f => primeira letra
  //  tipo = i => ingrediente
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?${tipo}=${input}`;
  return fetch(URL).then((data) => data.json());
}

export function fetchDrinks(tipo, input) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${tipo}=${input}`;
  return fetch(URL).then((data) => data.json());
}

export function fetchIngredients(input) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
  return fetch(URL).then((data) => data.json());
}