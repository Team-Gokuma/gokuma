import axios from "axios";

export const getShoppinglist = async () => {
  try {
    const response = await axios.get("/api/shoppingList/list");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postShoppinglist = async (content, checked) => {
  try {
    const data = { content: content, checked: checked };
    const response = await axios.post("/api/shoppingList/", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const putShoppinglist = async (content, checked, id) => {
  try {
    const data = { content: content, checked: checked, id: id };
    const response = await axios.put("/api/shoppingList/", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteShoppinglist = async (content, checked, id) => {
  try {
    const data = { content: content, checked: checked, id: id };
    const response = await axios.delete("/api/shoppingList/", { data: data });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllShoppinglist = async () => {
  try {
    const reponse = await axios.delete("/api/shoppingList/list");
    return reponse;
  } catch (error) {
    console.log(error);
  }
};

export const lackingrds = async (ingredients) => {
  try {
    const data = { ingredients: ingredients };
    const response = await axios.post("/api/shoppingList/lackingrds", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
