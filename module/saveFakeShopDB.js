import Product from "../models/Product.js";
import axios from "axios";

const categories = ["Cocktail", "Ordinary_Drink", "Beer"];

const delay = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

export const fetchCocktails = async () => {
  for (let category of categories) {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
    );

    for (let drink of response.data.drinks) {
      fetchCocktailDetails(
        drink.strDrink,
        drink.idDrink,
        category,
        drink.strDrinkThumb
      );
      await delay();
    }
  }
};

const fetchCocktailDetails = async (name, id, category, image) => {
  const response = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const description = response.data.drinks[0].strInstructions;
  saveCocktailsToMongoDB(name, category, image, description);
};

const saveCocktailsToMongoDB = (name, category, img, description) => {
  const price = parseFloat((Math.random() * (100 - 11) + 10).toFixed(2));
  const limit = Math.round(Math.random() * (30 - 20) + 20);

  const cocktail = new Product({
    name,
    img,
    price,
    description,
    limit,
    category,
  });
  cocktail.save();
};
