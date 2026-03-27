import { api } from "../../service/axiosInstance";

export const analyticsAPI = async (range) => {
  const res = await api.get(`/analytics/summary?range=${range}`);
  return res.data;
};
