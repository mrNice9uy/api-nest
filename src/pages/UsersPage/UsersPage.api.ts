import { api } from 'src/api/setupAPI';
import { AxiosRequestConfig } from 'axios';
import { IUser, IUserCreate, IUserDTO } from 'src/user/user.types';
import { openNotification } from 'src/utils/utils';

export const getUser = (config?: AxiosRequestConfig) =>
  api.get<IUserDTO>('/user', config).then((data) => data);

export const getUsers = () =>
  api.get<IUserDTO[]>('/user/all').then(({ data }) => data);

export const addUser = (params: IUserCreate, config?: AxiosRequestConfig) =>
  api.post<IUser>('/user', params, config).then(({ data }) => data);

export const editUser = (params: IUserDTO, config?: AxiosRequestConfig) =>
  api
    .put<IUserDTO>('/user', params, config)
    .then(({ data }) => data)
    .catch(({ response }) =>
      openNotification('error', response.data.status, response.data.message),
    );

export const deleteUser = (id: string, config?: AxiosRequestConfig) =>
  api.delete(`/user/${id}`, config).then(() => true);
