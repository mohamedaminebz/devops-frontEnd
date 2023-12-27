import axios from '../utils/customAxios';


export function addUser  (user){
    return axios.post(`/api/User/add`,user).then((r)=>r.data)
}

export function getStats  (){
    return axios.get(`/user/stats`).then((r)=>r.data)
}
export function getReservations  (){
    return axios.get(`/user/recentReservations`).then((r)=>r.data)
}
export function getweekly  (){
    return axios.get(`/user/weekly-sums`).then((r)=>r.data)
}