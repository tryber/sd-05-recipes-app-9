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

export function fetchDetails(type, id) {
  const URLComida = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const URLBebida = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  if (type === 'comidas') {
    return fetch(URLComida).then((response) => (response.json()));
  } else {
    return fetch(URLBebida).then((response) => (response.json()));
  }
}
