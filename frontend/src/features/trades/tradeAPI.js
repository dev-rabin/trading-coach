import { api } from "../../service/axiosInstance";

export const fetchTradesAPI = async ({ strategy, range, search, page }) => {
  const params = new URLSearchParams();

  if (strategy !== "All") params.append("strategy", strategy);
  if (range !== "All") params.append("range", range);
  if (search) params.append("search", search);

  params.append("page", page);
  params.append("limit", 12);

  const res = await api.get(`/trades?${params.toString()}`);
  return res.data;
};

export const logTradeAPI = async (data) => {
  const res = await api.post("/trades/create", data);
  return res.data;
};
