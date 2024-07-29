import axios from "axios";

export const AXIOS = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

AXIOS.interceptors.request.use(function (config) {
  config.baseURL = "http://127.0.0.1:8000/api";

  return config;
});
