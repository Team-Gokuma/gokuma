import axios from "axios";

export const logout = async () => {
  try {
    const { data } = await axios.get("/api/user/logout");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const islogin = async () => {
  try {
    const { data } = await axios.get("/api/user/islogin");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (inputs) => {
  try {
    const { data } = await axios.post("/api/user/login", inputs);
    return data;
  } catch (error) {
    console.log(error);
    alert("아이디 비밀번호가 존재하지 않습니다!");
  }
};

export const signup = async (body) => {
  try {
    const { data } = await axios.post("/api/user/signup", body);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const nameupdate = async (body) => {
  try {
    const { data } = await axios.post("/api/user/nameupdate", body);
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const passupdate = async (body) => {
  try {
    const { data } = await axios.post("/api/user/passupdate", body);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const userdelete = async (body) => {
  try {
    const { data } = await axios.post("/api/user/delete", body);
    return data;
  } catch (error) {
    console.log(error);
  }
};
