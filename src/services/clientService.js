import axios from '../utils/customAxios';

export function fetchServicesWithSpace(category) {
  return axios.get(`/Service/client/services/${category}`).then((r) => r.data);
}

export function createMembership(Membership) {
  return axios.post(`/partnership/create`, Membership).then((r) => r.data);
}
