import { api } from 'src/api/setupAPI';
import { AxiosRequestConfig } from 'axios';
import { IUser, IUserCreate, IUserDTO } from 'src/user/user.types';

export const getUsers = () =>
  api.get<IUserDTO[]>('/user/all').then(({ data }) => data);

export const addUser = (params: IUserCreate, config?: AxiosRequestConfig) =>
  api.post<IUser>('/user', params, config).then(({ data }) => data);

export const editUser = (params: IUserDTO, config?: AxiosRequestConfig) =>
  api.put<IUserDTO>('/user', params, config).then(({ data }) => data);

export const deleteUser = (id: string, config?: AxiosRequestConfig) =>
  api.delete(`/user/${id}`, config).then(() => true);
