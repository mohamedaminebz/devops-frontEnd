import axios from '../utils/customAxios';

export function fetchServicesPerSpace(id) {
  return axios.get(`/Service/Space/${id}`).then((r) => r.data);
}
export function fetchSpaceById(id) {
  return axios.get(`/api/Space/${id}/getOne`).then((r) => r.data);
}
//Crud Service
export function createService(service) {
  return axios.post(`/api/Service/add`, service).then((r) => r.data);
}
export function deleteService(id) {
  return axios.delete(`/api/Service/delete/${id}`).then((r) => r.data);
}
export function updateService(service) {
  return axios.put(`/api/Service/update/${service.get('_id')}`, service).then((r) => r.data);
}
export function makePromotion(service) {
  return axios.put(`/Service/promotion`, service).then((r) => r.data);
}
export function resetPrice(service) {
  return axios.put(`/Service/reset`, service).then((r) => r.data);
}

export function toggleFavorite(service) {
  return axios.post(`/space/toggleFavory`, service).then((r) => r.data);
}

export function fetchMyFavories(id) {
  return axios.get(`/space/userFavory/${id}`).then((r) => r.data);
}