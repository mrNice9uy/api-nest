import { notification } from 'antd';

export const openNotification = (
  type: string,
  status: string,
  text: string,
) => {
  notification[type]({
    message: status,
    description: text,
  });
};
