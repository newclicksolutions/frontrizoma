import axios from "axios";

const clientAxios = axios.create({
  // baseURL: "https://api-apprizoma.herokuapp.com",
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

export const setAccessToken = (token) =>
  (clientAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`);

export default clientAxios;
