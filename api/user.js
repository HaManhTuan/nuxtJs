import axios from "axios";
export function getUsers(params = {}) {
  return axios.get('/user', { params });
}

export function addUser(params) {
  return axios.post('https://user-manager-c67d2-default-rtdb.firebaseio.com/users.json', params).then(response => response)
    .catch(error => error);
}

