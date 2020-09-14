const watchToEmbed = (link) => {
  const endpoint = link.split('=');
  return `https://www.youtube.com/embed/${endpoint[1]}`;
};

const recipeMapper = (recipe) => ({
  recipeThumb: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
  drinkOrFood: recipe.strMeal ? recipe.strMeal : recipe.strDrink,
  category: recipe.strAlcoholic ? recipe.strAlcoholic : recipe.strCategory,
  ingredientData: {
    ingredients: [
      recipe.strIngredient1,
      recipe.strIngredient2,
      recipe.strIngredient3,
      recipe.strIngredient4,
      recipe.strIngredient5,
      recipe.strIngredient6,
      recipe.strIngredient7,
      recipe.strIngredient8,
      recipe.strIngredient9,
      recipe.strIngredient10,
      recipe.strIngredient11,
      recipe.strIngredient12,
      recipe.strIngredient13,
      recipe.strIngredient14,
      recipe.strIngredient15,
      recipe.strIngredient16,
      recipe.strIngredient17,
      recipe.strIngredient18,
      recipe.strIngredient19,
      recipe.strIngredient20,
    ],
    measures: [
      recipe.strMeasure1,
      recipe.strMeasure2,
      recipe.strMeasure3,
      recipe.strMeasure4,
      recipe.strMeasure5,
      recipe.strMeasure6,
      recipe.strMeasure7,
      recipe.strMeasure8,
      recipe.strMeasure9,
      recipe.strMeasure10,
      recipe.strMeasure11,
      recipe.strMeasure12,
      recipe.strMeasure13,
      recipe.strMeasure14,
      recipe.strMeasure15,
      recipe.strMeasure16,
      recipe.strMeasure17,
      recipe.strMeasure18,
      recipe.strMeasure19,
      recipe.strMeasure20,
    ],
  },
  instructions: recipe.strInstructions,
  video: recipe.strYoutube ? watchToEmbed(recipe.strYoutube) : null,
  localStorage: {
    id: recipe.idMeal ? recipe.idMeal : recipe.idDrink,
    type: recipe.idMeal ? 'comida' : 'bebida',
    area: recipe.strArea ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
    name: recipe.strMeal ? recipe.strMeal : recipe.strDrink,
    image: recipe.strMealThumb ? recipe.strMealThumb : recipe.strDrinkThumb,
  }
});

export default recipeMapper;
