import axios from 'axios'

export const loginApi = (data) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, data);
};
