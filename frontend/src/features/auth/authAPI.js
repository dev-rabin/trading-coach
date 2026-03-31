import { api } from "../../service/axiosInstance.js";

export const loginAPI = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const getMeAPI = async () => {
  const res = await api.get("/auth/getme");
  return res.data;
};

export const signupAPI = async (data) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const logoutAPI = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const updateProfileAPI = async (data) => {
  const res = await api.patch("/auth/update", data);
  return res.data;
};
