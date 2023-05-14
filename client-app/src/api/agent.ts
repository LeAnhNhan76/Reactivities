import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiUrl, baseAPIURL } from '../constants/url.constants';
import { IActivity } from '../models/activity.model';
import { AuthInfoModel, LoginModel } from '../models/login.model';
import { getAuthInfo } from '../utils/localStorage.utils';
import { IAddActivity } from '../models/add-activity.model';

//axios.defaults.baseURL = 'https://localhost:5000/api';
//axios.defaults.baseURL = 'https://localhost:44311/api';

const axiosInstance = axios.create({
  baseURL: baseAPIURL
});

axiosInstance.interceptors.request.use((
  config: AxiosRequestConfig) => {
    const authInfo = getAuthInfo()

    if(authInfo) {
      config.headers.Authorization = `Bearer ${authInfo.token}`
    }
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

const Activities = {
  list: () : Promise<IActivity[]> => requests.get('/activities'),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IAddActivity) => requests.post('/activities', activity),
  update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`),
  cancel: (id: string) => requests.patch(`/activities/${id}/cancel`)
}

const Account = {
  login: (model: LoginModel): Promise<AuthInfoModel> => requests.post(`/${apiUrl.account}/login`, model)
}

const Setting = {
  ping: () => requests.get(`/${apiUrl.setting}/ping`)
}

const Followers = {
  followUser: (userId: string): Promise<boolean> => requests.post(`/${apiUrl.followers}`, {
    userId
  }),
  unFollowUser: (userId: string): Promise<boolean> => requests.del(`/${apiUrl.followers}?userId=${userId}`)
}

const agent = {
  Activities,
  Account,
  Followers
}

export default agent;