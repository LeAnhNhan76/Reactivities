import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { baseAPIURL } from '../constants/api.constant';
import { SettingKeyConstants } from '../constants/setting.constant';
import { getToken, hasToken } from '../utils/authentication.util';
import { removeLocalStorageItem } from '../utils/localStorage.util';
import Account from './account.api';
import Activities from './activities.api';
import ActivityMembers from './activity-members.api';
import Followers from './followers.api';
import Users from './users.api';

//axios.defaults.baseURL = 'https://localhost:5000/api';
//axios.defaults.baseURL = 'https://localhost:44311/api';

const axiosInstance = axios.create({
  baseURL: baseAPIURL
});

axiosInstance.interceptors.request.use((
  config: AxiosRequestConfig) => {
    if (hasToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
  
    return config;
}, (error: any) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((value: AxiosResponse) => {
  return Promise.resolve(value);
}, async (error) => {
  if (error && error.response?.status === 401) {
    try {
      await requests.post('REFRESH TOKEN ENDPOINT', {});
      // SET REFRESH TOKEN HERE
    }
    catch (refreshError) {
      // LOG REFRESH TOKEN FAILED
      console.log('Refresh token failed', refreshError);

      // REMOVE TOKEN AND AUTHEN PROFILE IN LOCAL STORAGE
      removeLocalStorageItem(SettingKeyConstants.AccessToken);
      removeLocalStorageItem(SettingKeyConstants.AuthenProfile);
      
      // USER NEED TO LOG IN AGAIN
      window.location.href = 'LOGIN URL';
      return Promise.reject(error);
    } 
  }
  return Promise.reject(error);
})

const responseBody = <T>(response : AxiosResponse<T>) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => {
  console.log('log from sleep');
  return new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));
}

const sleepTime = 200;

export const requests = {
  get: <T>(url: string) => axiosInstance.get<T>(url).then(sleep(sleepTime)).then(responseBody),
  post : <T>(url: string, body?: {}) => axiosInstance.post<T>(url, body).then(sleep(sleepTime)).then(responseBody),
  put : <T>(url: string, body?: {}) => axiosInstance.put<T>(url, body).then(sleep(sleepTime)).then(responseBody),
  patch: <T>(url: string, body?: {}) => axiosInstance.patch<T>(url, body).then(sleep(sleepTime)).then(responseBody),
  del : <T>(url: string) => axiosInstance.delete<T>(url).then(sleep(sleepTime)).then(responseBody),
}

const agent = {
  Account,
  Activities,
  Users,
  Followers,
  ActivityMembers
}

export default agent;