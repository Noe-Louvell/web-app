import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL:'https://projetcubesapi.herokuapp.com/api',
  
})

export const getToken = (key) => {
  return Cookies.get(key);
}