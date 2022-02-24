import axios from "axios";

export const recognition = async (img) => {
  try {
    const data = { img: img };
    const response = await axios.post("/api/recipe/recoginition", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const recommendRecipe = async (ingredients) => {
  try {
    const data = { ingredients: ingredients };
    const response = await axios.post("/api/recipe/recommend", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const relatedRecipe = async (recipes) => {
  try {
    const data = { recipes: recipes };
    const response = await axios.post("/api/recipe/related", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
