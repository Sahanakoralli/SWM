import axios from "axios";
const API_URL = "/api/";

export const updateUser = (id, data) =>
  axios.post(`${API_URL}updateUser/${id}`, data);

export const addUser = (data) => axios.post(`${API_URL}admin/addUser`, data);

export const allUser = () => axios.get(`${API_URL}admin/allUserList`);

export const deleteUser = (id) => axios.delete(`${API_URL}admin/user/${id}`);
