/* eslint-disable no-unused-vars */
import axios from '../utils/customAxios';

const API_URL = '/api/Category/';

const getAll = () => axios.get(`${API_URL}getAll`);
const add = (data) => axios.post(`${API_URL}add`, data);
const updateStatus = async (id, data) => {
  console.log(id);
  axios.put(`${API_URL}update/${id}`, data);
};

const getCategoriesActive = () => axios.get(`/Category/Active`).then((r) => r.data);
const fetchActiveSubCategoriesForSpace = (id) => axios.get(`/Category/subCategory/Active/${id}`).then((r) => r.data);

const categoriesServices = {
  getAll,
  add,
  updateStatus,
  getCategoriesActive,
  fetchActiveSubCategoriesForSpace
};

export default categoriesServices;
