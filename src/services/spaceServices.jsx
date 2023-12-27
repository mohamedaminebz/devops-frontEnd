import axios from '../utils/customAxios';

const API_URL = '/space/';
const DYNAMIC_URL = '/api/Space/';

export function add(data) {
  return axios.post(`${API_URL}add`, data).then((r) => r.data);
}

export function getById(id) {
  return axios.get(`${DYNAMIC_URL}getOne/${id}`).then((r) => r.data);
}
export function updatedOpeningHours(data) {
  const { _id, openingHours } = data;

  return axios.put(`${API_URL}update/${_id}`, { openingHours });
}
export function update(data) {
  const { _id, newData } = data;
  return axios.put(`${API_URL}update/${_id}`, newData);
}

export function getAll() {
  return axios.get(`${DYNAMIC_URL}getAll`);
}
