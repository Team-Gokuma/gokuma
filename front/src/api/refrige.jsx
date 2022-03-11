import axios from "axios";

export const ingredientList = async () => {
  try {
    const response = await axios.get("/api/refrigerator/list");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addIngredient = async (ingredients) => {
  try {
    const data = { ingredients: ingredients };
    const response = await axios.post("api/refrigerator/save", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteIngredient = async (id) => {
  try {
    const response = await axios.delete(`/api/refrigerator/delete/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllIngredient = async () => {
  try {
    const response = await axios.delete("/api/refrigerator/list");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const timeoverIngredient = async () => {
  try {
    const response = await axios.get("/api/refrigerator/time");
    return response;
  } catch (error) {
    console.log(error);
  }
};
