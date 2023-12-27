import axios from '../utils/customAxios';

const API_URL = '/user/';

const login = (info) => {
  return axios.post(`${API_URL}login`, info);
};

const register = (info) => {
  return axios.post(`${API_URL}register`, info);
};

const getUserByToken = () => axios.get(`${API_URL}getUserByToken`);

const forgotPassword = (email) => axios.post(`${API_URL}forgot`, email);

const changePassword = (info) => axios.put(`${API_URL}change_password`, info).then((r) => r.data);
const updateProfile = (info) => axios.put(`${API_URL}updateInfo`, info).then((r) => r.data);

const authService = {
  login,
  getUserByToken,
  forgotPassword,
  changePassword,
  updateProfile,
  register
};

export default authService;
