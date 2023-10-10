import { api } from 'src/api/setupAPI';
import { AxiosRequestConfig } from 'axios';
import { IService, IServiceCreate } from 'src/service/service.types';
import { openNotification } from 'src/utils/utils';

export const getServices = () =>
  api.get<IService[]>('/service').then(({ data }) => data);

export const createService = (
  params: IServiceCreate,
  config?: AxiosRequestConfig,
) =>
  api
    .post<IServiceCreate>('/service', params, config)
    .then(({ data }) => data)
    .catch(({ response }) =>
      openNotification(
        'error',
        response.data.statusCode,
        response.data.message,
      ),
    );

export const editService = (params: IService, config?: AxiosRequestConfig) => {
  const id = localStorage.getItem('editingKey');

  return api
    .put<IService>(`/service/${id}`, params, config)
    .then(({ data }) => data)
    .catch(({ response }) =>
      openNotification('error', response.data.status, response.data.message),
    );
};

export const deleteService = (id: string, config?: AxiosRequestConfig) =>
  api
    .delete(`/service/${id}`, config)
    .then(() => true)
    .catch(({ response }) =>
      openNotification(
        'error',
        response.data.statusCode,
        response.data.message,
      ),
    );
