import axios from "axios";

const baseURL = import.meta.env.VITE_PERPUSATAKAAN_SERVICE;
// const baseURL = "http://127.0.0.1:8000/api";

export const AXIOS = axios.create({
  baseURL: baseURL,
});

AXIOS.interceptors.request.use(function (config) {
  config.baseURL = baseURL;

  return config;
});
