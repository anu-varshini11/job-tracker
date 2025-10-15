import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/jobs'
});

export const getJobs = async (query = '') => {
  const res = await API.get(`/${query}`);
  return res.data;
};


export const createJob = async (job) => {
  const res = await API.post('/', job);
  return res.data;
};

export const updateJob = async (id, job) => {
  const res = await API.put(`/${id}`, job);
  return res.data;
};

export const deleteJob = async (id) => {
  const res = await API.delete(`/${id}`);
  return res.data;
};
