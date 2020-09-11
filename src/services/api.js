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

export function fetchCategories(route) {
  let URL;
  switch(route) {
    case "/comidas":
      URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      break;
    case "/bebidas":
      URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      break;
    default:
      URL = '';
  }
  return fetch(URL).then(data => data.json());
}

export function fetchRecipesByCategory(route, categoryName) {
  let URL;
  switch(route) {
    case "/comidas":
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
      break;
    case "/bebidas":
      URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`;
      break;
    default:
      URL = '';
  }
  
  return fetch(URL).then(data => data.json());
}
