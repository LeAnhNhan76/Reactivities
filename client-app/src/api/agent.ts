import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { baseAPIURL } from '../constants/api.constant';
import Account from './account';

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
  console.log('Error api: ', error);

  return Promise.reject(error);
});

const responseBody = <T>(response : AxiosResponse<T>) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

export const requests = {
  get : <T>(url: string) => axiosInstance.get<T>(url).then(sleep(1000)).then(responseBody),
  post : <T>(url: string, body?: {}) => axiosInstance.post<T>(url, body).then(sleep(1000)).then(responseBody),
  put : <T>(url: string, body?: {}) => axiosInstance.put<T>(url, body).then(sleep(1000)).then(responseBody),
  patch: <T>(url: string, body?: {}) => axiosInstance.patch<T>(url, body).then(sleep(1000)).then(responseBody),
  del : <T>(url: string) => axiosInstance.delete<T>(url).then(sleep(1000)).then(responseBody),
}

const agent = {
  Account
}

export default agent;