import { api } from 'src/api/setupAPI';
import { AxiosRequestConfig } from 'axios';
import { IUserAuth, IUserCreate, TRefreshToken } from 'src/user/user.types';
import { openNotification } from 'src/utils/utils';

export const createUser = (params: IUserCreate, config?: AxiosRequestConfig) =>
  api
    .post<TRefreshToken>('/auth/register', params, config)
    .then(({ data }) => data);

export const loginUser = (params: IUserAuth, config?: AxiosRequestConfig) =>
  api
    .post<TRefreshToken>('/auth/login', params, config)
    .then((data) => data)
    .catch(({ response }) =>
      openNotification('error', response.data.status, response.data.message),
    );
