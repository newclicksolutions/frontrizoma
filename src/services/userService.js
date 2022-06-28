import clientAxios from "../config/axios";

const tokenKey = "token";
const userKey = "user";

export const signIn = async (data) => {
  return clientAxios.post("/auth/login", data);
};

export const getUser = () => clientAxios.get("/auth/user");

export const signOut = (value) => {
  localStorage.removeItem(userKey);
  localStorage.removeItem(tokenKey);
};
