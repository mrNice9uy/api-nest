import { useQuery } from 'react-query';

import { reactQueryNoCacheOptions } from 'src/constants/constants';
import { useImmer } from 'use-immer';
import { getService } from './ServicePage.api';

export const useServicePage = () => {
  const [values, setValues] = useImmer([]);

  const { isLoading, isRefetching } = useQuery(
    ['getService'],
    async () => {
      try {
        const data = await getService();
        setValues(data);
      } catch {
        console.log('err.');
      }
    },
    { ...reactQueryNoCacheOptions },
  );

  return {
    values,
    isLoading: isLoading || isRefetching,
  };
};
