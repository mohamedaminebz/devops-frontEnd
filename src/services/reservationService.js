/* eslint-disable no-unused-vars */
import axios from '../utils/customAxios';

const API_URL = '/reservation/';
const DYNAMIC_URL = '/api/Reservation/';

export function addReservation(data) {
  const { _id, newData } = data;
  return axios.post(`${API_URL}add/${_id}`, newData).then((r) => r.data);
}

export function getAvailableTimeOnAdate(data) {
  return axios.post(`${API_URL}available`, data).then((r) => r.data);
}
export function FetchMyReservations(spaceId) {
  return axios.get(`Reservation/space/${spaceId}`).then((r) => r.data);
}

export function toggleReservations(spaceId) {
  return axios.put(`Reservation/space/toggle/${spaceId}`).then((r) => r.data);
}
export function FetchReservationsByUser() {
  return axios.get(`${API_URL}getAllByUser`).then((r) => r.data);
}
