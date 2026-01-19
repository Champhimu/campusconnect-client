import axios from 'axios';

export const submitRegistrationRequest = (data) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/registration/request`, data);
};