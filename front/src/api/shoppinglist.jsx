import axios from "axios";

export const getShoppinglist = async () => {
  try {
    const response = axios.get("/api/shoppingList/list");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const postShoppinglist = async (content, checked) => {
  try {
    const data = { content: content, checked: checked };
    const response = axios.post("/api/shoppingList/", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const putShoppinglist = async (content, checked, id) => {
  try {
    const data = { content: content, checked: checked, id: id };
    const response = axios.put("/api/shoppingList/", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteShoppinglist = async (content, checked, id) => {
  try {
    const data = { content: content, checked: checked, id: id };
    const response = axios.delete("/api/shoppingList/", { data: data });
    return response;
  } catch (error) {
    console.log(error);
  }
};
