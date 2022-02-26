import axios from "axios";

export const getbookmark = () => {
  try {
    const response = axios.get("/api/bookmark/list");
    return response;
  } catch (error) {
    console.log(error);
  }
};
