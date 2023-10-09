import { useQuery } from 'react-query';

import { reactQueryNoCacheOptions } from 'src/constants/constants';
import {
  createService,
  deleteService,
  editService,
  getServices,
} from './ServicePage.api';
import { useCallback } from 'react';
import { IService, IServiceCreate } from 'src/service/service.types';
import { openNotification } from 'src/utils/utils';

export const useServicePage = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery(
    ['getServices'],
    async () => {
      try {
        return await getServices();
      } catch {
        console.log('err.');
      }
    },
    { ...reactQueryNoCacheOptions },
  );

  const handleAddService = useCallback(async (service: IServiceCreate) => {
    try {
      await createService(service, { withCredentials: true });
      await refetch();
    } catch (err) {
      openNotification('error', err.response?.status, err.response?.data);
    }
  }, []);

  const handleEditService = useCallback(async (data: IService) => {
    try {
      await editService(data, { withCredentials: true });
      await refetch();
    } catch (err) {
      openNotification('error', err.response?.status, err.response?.data);
    }
  }, []);

  const handleDeleteService = useCallback(async (id: string) => {
    try {
      await deleteService(id, { withCredentials: true });
      await refetch();
    } catch (err) {
      openNotification('error', err.response?.status, err.response?.data);
    }
  }, []);

  return {
    data,
    isLoading: isLoading || isRefetching,
    handleAddService,
    handleEditService,
    handleDeleteService,
  };
};
