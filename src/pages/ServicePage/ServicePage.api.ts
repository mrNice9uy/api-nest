import { api } from 'src/api/setupAPI';
import { AxiosRequestConfig } from 'axios';
import { IService, IServiceCreate } from 'src/service/service.types';

export const getService = () =>
  api.get<IService[]>('/service').then(({ data }) => data);

export const createService = (params: undefined, config?: AxiosRequestConfig) =>
  api.post<IServiceCreate>('/service', params, config).then(({ data }) => data);
