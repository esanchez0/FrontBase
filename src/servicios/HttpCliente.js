import axios from "axios";

//axios.defaults.baseURL = "https://localhost:44340/api";
//axios.defaults.baseURL ='https://cursosonline.azurewebsites.net/api';
axios.defaults.baseURL ='https://38.242.151.209/TdigitaliWs/api';

axios.interceptors.request.use(
  (config) => {
    const token_seguridad = window.localStorage.getItem("token_seguridad");

    if (token_seguridad) {
      config.headers.Authorization = "Bearer " + token_seguridad;
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

const requestGenerico = {
  get: (url) => axios.get(url),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
  delete: (url) => axios.delete(url),
};

export default requestGenerico;
