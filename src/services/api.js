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
  }
  return fetch(URLBebida).then((response) => (response.json()));
}

export function fetchCategories(route) {
  let URL;
  switch (route) {
    case '/comidas':
      URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      break;
    case '/bebidas':
      URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      break;
    default:
      URL = '';
  }
  return fetch(URL).then((data) => data.json());
}

export function fetchRecipesByCategory(route, categoryName) {
  let URL;
  switch (route) {
    case '/comidas':
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
      break;
    case '/bebidas':
      URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`;
      break;
    default:
      URL = '';
  }
  return fetch(URL).then((data) => data.json());
}

export function fetchIngredientsMeals(input) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
  return fetch(URL).then((data) => data.json());
}

export function fetchIngredientsDrinks(input) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`;
  return fetch(URL)
    .then((response) => response.text()
    .then((data) => {
      if (data === '') {
        return null;
      }
      return JSON.parse(data);
    }));
}

export function fetchIngredientsDrinksWithoutText(input) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`;
  return fetch(URL)
    .then((response) => response.json());
}

export function randomFood() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  return fetch(URL)
    .then((data) => data.json());
}

export function randomDrink() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  return fetch(URL)
    .then((data) => data.json());
}

export function fetchAreas() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  return (
    fetch(URL)
    .then((data) => data.json())
  );
}

export function fetchRecipesByArea(area) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  return (
    fetch(URL)
    .then((data) => data.json())
  );
}

export function fetchAllIngredientsMeals() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  return fetch(URL)
    .then((data) => data.json());
}

export function fetchAllIngredientsDrinks() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  return fetch(URL)
    .then((data) => data.json());
}
