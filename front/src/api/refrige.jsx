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
    const data = {
      img: img,
    };
    const response = axios.post("api/refrigerator/recoginition/photo", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addIngredientByText = async (content, category) => {
  try {
    const data = { content: content, category: category };
    const response = axios.post("api/refrigerator/recoginition/text", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteIngredient = async (id) => {
  try {
    const response = axios.delete(`/api/refrigerator/delete/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllIngredient = async () => {
  try {
    const response = axios.delete("/api/refrigerator/delete/all");
    return response;
  } catch (error) {
    console.log(error);
  }
};
