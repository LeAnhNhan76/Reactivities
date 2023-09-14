import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiUrl, baseAPIURL } from '../constants/api.constant';

//axios.defaults.baseURL = 'https://localhost:5000/api';
//axios.defaults.baseURL = 'https://localhost:44311/api';

const axiosInstance = axios.create({
  baseURL: baseAPIURL
});

axiosInstance.interceptors.request.use((
  config: AxiosRequestConfig) => {
    //const authInfo = getAuthInfo()

    // if(authInfo) {
    //   config.headers.Authorization = `Bearer ${authInfo.token}`
    // }
    return config;
}, (error) => {
  console.log('error', error);

  return Promise.reject(error);
});

const responseBody = (response : AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
  get : (url: string) => axiosInstance.get(url).then(sleep(1000)).then(responseBody),
  post : (url: string, body?: {}) => axiosInstance.post(url, body).then(sleep(1000)).then(responseBody),
  put : (url: string, body?: {}) => axiosInstance.put(url, body).then(sleep(1000)).then(responseBody),
  patch: (url: string, body?: {}) => axiosInstance.patch(url, body).then(sleep(1000)).then(responseBody),
  del : (url: string) => axiosInstance.delete(url).then(sleep(1000)).then(responseBody),
}


const agent = {
}

export default agent;