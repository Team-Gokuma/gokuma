import axios from "axios";

export const ingredientList = async () => {
  try {
    const response = axios.get("/api/refrigerator/list");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addIngredientByImage = async (img) => {
  try {
    const response = axios.post("api/refrigerator/recoginition/photo", img);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addIngredientByText = async (ingredient) => {
  try {
    const data = ingredient;
    const response = axios.post("api/refrigerator/recoginition/text", data);
    console.log(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
