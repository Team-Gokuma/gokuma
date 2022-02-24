import axios from "axios";

export const recognition = async (img) => {
  try {
    const data = { img: img };
    const response = await axios.post("/api/recipe/recoginition", data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
