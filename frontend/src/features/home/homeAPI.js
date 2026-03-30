import { api } from "../../service/axiosInstance";

export const homeAPI = async () => {
  const res = await api.get("/home");
  return res.data;
};
