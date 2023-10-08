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

  const handleAdduser = useCallback(async (user: IUserCreate) => {
    try {
      await addUser(user);
      await refetch();
    } catch (err) {
      openNotification('error', err.response?.status, err.response?.data);
    }
  }, []);

  const handleEditUser = useCallback(async (data: IUserDTO) => {
    try {
      debugger;
      const dt = {
        ...data,
        isActive: true,
      };
      await editUser(dt);
      await refetch();
    } catch (err) {
      openNotification('error', err.response?.status, err.response?.data);
    }
  }, []);

  const handleDeleteUser = useCallback(async (id: string) => {
    try {
      await deleteUser(id);
      await refetch();
    } catch (err) {
      openNotification('error', err.response?.status, err.response?.data);
    }
  }, []);

  return {
    data,
    isLoading,
    handleAdduser,
    handleEditUser,
    handleDeleteUser,
  };
};

/*

const onFinish = async (values: IUserCreate) => {
    try {
      await createUser(values);
      navigate('/services');
    } catch (err) {
      if (!err?.response) {
        openNotification('error', 'Something is wrong!', 'No server response');
      } else if (err.response?.status === 404) {
        openNotification(
          'error',
          err.response?.status,
          err.response?.statusText,
        );
      } else {
        openNotification('error', err.response?.status, err.response?.data);
      }
    }
  };
 */
