import axios from "axios";
import promise from "promise";
// import { BASE_URL } from '../environment/environment';
// Add a request interceptor
const Axios = axios.create();

Axios.interceptors.request.use(
  async (config) => {
    // Do something before request is sent

    const BASE_URL = "";

    // Mindful DB config
    config.headers["content-type"] = "application/json";
    // config.headers['X-USER-DATACENTER'] = 'EU';
    config.url = BASE_URL + config.url;

    //If the header does not contain the token and the url not public, redirect to login

    const token = localStorage.getItem("auth-token");

    //if token is found add it to the header
    if (token) {
      if (config.method !== "OPTIONS") {
        config.headers.authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  function (error) {
    return promise.reject(error);
  }
);

export default Axios;
