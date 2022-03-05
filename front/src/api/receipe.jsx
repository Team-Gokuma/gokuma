import axios from "axios";

export const recognition = async (formData) => {
  try {
    const response = await axios({
      method: "post",
      url: "/api/recipe/recoginition",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
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

export const detailRecipe = async (id, ingredients) => {
  try {
    const response = await axios.post(`/api/recipe/${id}`, ingredients);
    console.log(response);
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
