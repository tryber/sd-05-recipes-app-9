export const storeFavorites = (favoritado, recipe) => {
// guarda nos favoritos a receita se o usuario clicar no botão favoritar
  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
  } = recipe.localStorage;
  let receitasFavoritas = localStorage.getItem('favoriteRecipes');

  if (receitasFavoritas !== undefined && receitasFavoritas !== '') {
    receitasFavoritas = JSON.parse(receitasFavoritas);
  }
  const novaReceita = {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
  };

  if (favoritado) {
    receitasFavoritas = receitasFavoritas.filter(
      (receita) => receita.id !== novaReceita.id,
    );
    return localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(receitasFavoritas),
    );
  }

  if (
    receitasFavoritas !== undefined &&
    receitasFavoritas !== null &&
    receitasFavoritas.length !== 0
  ) {
    receitasFavoritas = [...receitasFavoritas, novaReceita];
    return localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(receitasFavoritas),
    );
  }
  return localStorage.setItem('favoriteRecipes', JSON.stringify([novaReceita]));
};

export const favoriteChecker = (id, setFavoritado) => {
// testa se a receita já foi favoritada antes
  let receitasFavoritas = localStorage.getItem('favoriteRecipes');
  if (receitasFavoritas) {
    receitasFavoritas = JSON.parse(receitasFavoritas);
    const receitaNoLocalStorage = receitasFavoritas.find((receita) => receita.id === id);
    if (receitaNoLocalStorage) setFavoritado(true);
  }
};

export const progressChecker = (id, comidaOuBebida, idElemento) => {
  // checa se o checkbox atual está marcado
  const inProgressRecipes = localStorage.getItem('inProgressRecipes') ?
  JSON.parse(localStorage.getItem('inProgressRecipes')) : false;
  const key = comidaOuBebida === 'comidas' ? 'meals' : 'cocktails';
  const categoriaAtual = inProgressRecipes[key];
  if (inProgressRecipes === false) return null;
  if (categoriaAtual[id] === undefined) return null;
  if (categoriaAtual[id].includes(idElemento)) {
    document.getElementById(idElemento).className = 'textoRiscado';
  }
  return categoriaAtual[id].includes(idElemento);
};
