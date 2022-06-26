import Cookies from "js-cookie";
import instance from "../axiosinstance";

export function isUserLoggedIn() {
  let user = Cookies.get("sessionUser");
  if (user === null) return false;
  return true;
}

export function setupAxiosInterceptors(token) {
  instance.interceptors.request.use((config) => {
    if (isUserLoggedIn()) {
      config.headers.authorization = token;
      console.log(config);
    }
    return config;
  });
}
