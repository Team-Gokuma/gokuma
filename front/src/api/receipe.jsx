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

export const cooktimeRecipe = async (time) => {
  try {
    const response = await axios.get(`/api/recipe/related/cooktime?time${time}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const rankRecipe = async () => {
  try {
    const response = await axios.get("api/recipe/related/rank");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const detailRecipe = async (id) => {
  try {
    const response = await axios.get(`/api/recipe/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addLike = async (id) => {
  try {
    const response = await axios.get(`/api/userlike/check/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
