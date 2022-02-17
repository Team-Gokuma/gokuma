import axios from 'axios';

export const isLogin = async () => {
    try {
      const { data } = await axios.get("/api/user/isSignin")
      return data
    } catch (error) {
      console.log(error)
    }
  }
  
  export const logout = async () => {
    try {
      const { data } = await axios.get("api/user/signout")
      return data
    } catch (error) {
      console.log(error)
    }
  }
  