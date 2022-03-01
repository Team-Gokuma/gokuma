import axios from "axios";

export const getbookmark = async () => {
  try {
    const response = await axios.get("/api/bookmark/list");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const setbookmark = async (id) => {
  try {
    const response = await axios.get(`/api/bookmark/check/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
