import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API; 

export const getJobs = async (query = '') => {
  const res = await API.get(query ? `/jobs?status=${query}` : '/jobs');
  return res.data;
};

export const createJob = async (job) => {
  const res = await API.post('/jobs', job);
  return res.data;
};

export const updateJob = async (id, job) => {
  const res = await API.put(`/jobs/${id}`, job);
  return res.data;
};

export const deleteJob = async (id) => {
  const res = await API.delete(`/jobs/${id}`);
  return res.data;
};

export const signupUser = async (username, password) => {
  const res = await API.post('/auth/register', { username, password });
  return res.data;
};

export const loginUser = async (username, password) => {
  const res = await API.post('/auth/login', { username, password });
  return res.data;
};
