import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IActivity } from '../models/activity.model';
import { SystemConstants } from '../constants/setting.constanst';
import { LoginModel, AuthInfoModel } from '../models/login.model';
import { apiUrl } from '../constants/url.constants';
import { getAuthInfo } from '../utils/localStorage.utils';

//axios.defaults.baseURL = 'https://localhost:5000/api';
//axios.defaults.baseURL = 'https://localhost:44311/api';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:5000/api'
});

axiosInstance.interceptors.request.use((
  config: AxiosRequestConfig) => {
    const authInfo = getAuthInfo()

    if(authInfo) {
      config.headers.Authorization = `Bearer ${authInfo.token}`
    }
    return config;
}, (error) => {
  return Promise.reject(error);
});

const responseBody = (response : AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
  get : (url: string) => axiosInstance.get(url).then(sleep(1000)).then(responseBody),
  post : (url: string, body: {}) => axiosInstance.post(url, body).then(sleep(1000)).then(responseBody),
  put : (url: string, body: {}) => axiosInstance.put(url, body).then(sleep(1000)).then(responseBody),
  del : (url: string) => axiosInstance.delete(url).then(sleep(1000)).then(responseBody)
}

const Activities = {
  list: () : Promise<IActivity[]> => requests.get('/activities'),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post('/activities', activity),
  update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`)
}

const Account = {
  login: (model: LoginModel): Promise<AuthInfoModel> => requests.post(`/${apiUrl.account}/login`, model)
}

const agent = {
  Activities,
  Account
}

export default agent;