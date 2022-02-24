import axios from "axios";

export const ingredientList = async () => {
  try {
    const response = axios.get("/api/refrigerator/list");
    return response;
  } catch (error) {
    console.log(error);
  }
};
