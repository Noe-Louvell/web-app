import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL:'http://localhost:3000/api',
  
})

export const getToken = (key) => {
  return Cookies.get(key);
}