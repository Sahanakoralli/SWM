import axios from "axios";
const API_URL = "/api/";

export const getDustbins = () => axios.get(`${API_URL}/current`);
export const deleteDustbin = (binId) =>
  axios.delete(`${API_URL}admin/deleteDustbin/${binId}`);
export const updateDustbin = (binId, data) =>
  axios.post(`${API_URL}admin/updateDustin/${binId}`, data);
export const addDustbin = (data) =>
  axios.post(`${API_URL}admin/addDustbin`, data);
