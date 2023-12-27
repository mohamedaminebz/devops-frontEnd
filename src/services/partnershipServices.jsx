import axios from '../utils/customAxios';

const API_URL = '/api/Partnership/';

const getAll = () => axios.get(`${API_URL}getAll`);
const approve = (id, data) => axios.put(`partnership/approve/${id}`, data);

const partnershipServices = {
  getAll,
  approve
};

export default partnershipServices;
