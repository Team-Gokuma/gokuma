import axios from "axios";

export const getbookmark = () => {
  try {
    const response = axios.get("/api/bookmark/list");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const setbookmark = (id) => {
  try {
    const response = axios.get(`/api/bookmark/check/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
