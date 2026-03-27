import { api } from "../../service/axiosInstance";

export const preTradeAPI = async (data) => {
  const res = await api.post("/pretrade/check", data);
  console.log("preTradeAPI : ", res);
  return res.data;
};
