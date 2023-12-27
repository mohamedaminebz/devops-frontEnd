/* eslint-disable no-unused-vars */
import axios from '../utils/customAxios';

const API_URL = '/review/';
const DYNAMIC_URL = '/api/Review/';

export function addReview(data) {
  const { _id, newData } = data;
  return axios.post(`${API_URL}add/${_id}`, newData).then((r) => r.data);
}

export function getReviewsByIdSpace(id) {
  return axios.get(`${API_URL}getAll/${id}`).then((r) => r.data);
}
export function checkuserReviewBySpace(id) {
  return axios.get(`${API_URL}checkuserReviewBySpace/${id}`).then((r) => r.data);
}
