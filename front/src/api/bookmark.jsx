import axios from "axios";

export const getBookmark = async () => {
  try {
    const response = await axios.get("/api/bookmark/list");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const saveBookmark = async (id) => {
  try {
    const response = await axios.get(`/api/bookmark/check/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
