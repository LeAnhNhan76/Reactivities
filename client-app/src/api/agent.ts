import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';

axios.defaults.baseURL = 'http://localhost:5000/api';
//axios.defaults.baseURL = 'https://localhost:44311/api';

const responseBody = (response : AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const handleError = (err: any) => {
  console.log('ERROR: ', err);
  return Promise.reject(err);
}

const requests = {
  get : (url: string) => axios.get(url).then(sleep(1000)).then(responseBody).catch(handleError),
  post : (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody).catch(handleError),
  put : (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody).catch(handleError),
  del : (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody).catch(handleError)
}

const Activities = {
  list: () : Promise<IActivity[]> => requests.get('/activities'),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post('/activities', activity),
  update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`)
}

const agent = {
  Activities
}

export default agent;