import { useQuery } from 'react-query';

import { reactQueryNoCacheOptions } from 'src/constants/constants';
import { addUser, deleteUser, editUser, getUsers } from './UsersPage.api';
import { openNotification } from 'src/utils/utils';
import { useCallback } from 'react';
import { IUserCreate, IUserDTO } from 'src/user/user.types';
import { useAuth } from 'src/hooks/useAuth';
import { postRefreshToken } from '../LoginPage/LoginPage.api';
import { useNavigate } from 'react-router';

export const useUsersPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { isLoading, data, refetch } = useQuery(
    ['getUsers'],
    async () => {
      try {
        return await getUsers();
      } catch (err) {
        openNotification('error', err.response?.statusCode, err.response?.data);
      }
    },
    { ...reactQueryNoCacheOptions },
  );

  const handleAddUser = useCallback(async (user: IUserCreate) => {
    try {
      await addUser(user);
      await refetch();
    } catch (err) {
      openNotification('error', err.response?.statusCode, err.response?.data);
    }
  }, []);

  const handleEditUser = useCallback(async (data: IUserDTO) => {
    try {
      const response = await editUser(data, { withCredentials: true });

      if (response.data?.statusCode == 403) {
        const refreshResponse = await postRefreshToken(
          { refreshToken: auth.refreshToken },
          { withCredentials: true },
        );

        if (refreshResponse.data?.statusCode === 401) {
          navigate('/login');
          return;
        }

        await editUser(data, { withCredentials: true });
        await refetch();

        return;
      }

      await refetch();
    } catch (err) {
      openNotification('error', err.response?.statusCode, err.response?.data);
    }
  }, []);

  const handleDeleteUser = useCallback(async (id: string) => {
    try {
      const response = await deleteUser(id, { withCredentials: true });
      console.log(response);
      if (response.data?.statusCode == 403) {
        const refreshResponse = await postRefreshToken(
          { refreshToken: auth.refreshToken },
          { withCredentials: true },
        );

        if (refreshResponse.data?.statusCode === 401) {
          navigate('/login');
          return;
        }

        await deleteUser(id, { withCredentials: true });
        await refetch();

        return;
      }
      await refetch();
    } catch (err) {
      openNotification('error', err.response?.statusCode, err.response?.data);
    }
  }, []);

  return {
    data,
    isLoading,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
  };
};
