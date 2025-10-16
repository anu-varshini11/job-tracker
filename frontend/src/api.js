import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const API = axios.create({
  baseURL: `${API_BASE}/api/jobs`, // add /api/jobs so all requests go to jobs route
});

// Automatically include JWT token in request headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getJobs = async (query = '') => {
  const res = await API.get(query ? `/?status=${query}` : '/');
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
