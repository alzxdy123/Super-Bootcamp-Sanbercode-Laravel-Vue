import axios from "axios";

const baseURL = import.meta.env.VITE_PERPUSATAKAAN_SERVICE;

export const AXIOS = axios.create({
  baseURL: baseURL,
});

AXIOS.interceptors.request.use(function (config) {
  config.baseURL = baseURL;

  return config;
});
