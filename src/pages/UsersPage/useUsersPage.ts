import { useQuery } from 'react-query';

import { reactQueryNoCacheOptions } from 'src/constants/constants';
import { addUser, deleteUser, editUser, getUsers } from './UsersPage.api';
import { openNotification } from 'src/utils/utils';
import { useCallback } from 'react';
import { IUserCreate, IUserDTO } from 'src/user/user.types';

export const useUsersPage = () => {
  const { isLoading, data, refetch } = useQuery(
    ['getUsers'],
    async () => {
      try {
        return await getUsers();
      } catch (err) {
        openNotification('error', err.response?.status, err.response?.data);
      }
    },
    { ...reactQueryNoCacheOptions },
  );

  const handleAddUser = useCallback(async (user: IUserCreate) => {
    try {
      await addUser(user);
      await refetch();
    } catch (err) {
      openNotification('error', err.response?.status, err.response?.data);
    }
  }, []);

  const handleEditUser = useCallback(async (data: IUserDTO) => {
    try {
      await editUser(data, { withCredentials: true });
      await refetch();
    } catch (err) {
      openNotification('error', err.response?.status, err.response?.data);
    }
  }, []);

  const handleDeleteUser = useCallback(async (id: string) => {
    try {
      await deleteUser(id, { withCredentials: true });
      await refetch();
    } catch (err) {
      openNotification('error', err.response?.status, err.response?.data);
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
