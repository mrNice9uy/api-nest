import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { openNotification } from '../../utils/utils';
import { IUserAuth } from 'src/user/user.types';
import { loginUser } from './LoginPage.api';
import { useAuth } from 'src/hooks/useAuth';
import { getUser } from '../UsersPage/UsersPage.api';

export const LoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';

  const onFinish = async (values: IUserAuth) => {
    try {
      const response = await loginUser(values, {
        withCredentials: true,
      });

      if (response) {
        const refreshToken = response.data.refreshToken;
        await getUser({ withCredentials: true });
        setAuth({ ...values, refreshToken });
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (!err?.response) {
        openNotification('error', 'Something is wrong!', 'No server response');
      } else if (err.response?.statusCode === 404) {
        openNotification(
          'error',
          err.response?.statusCode,
          err.response?.message,
        );
      } else {
        openNotification('error', err.response?.statusCode, err.response?.data);
      }
    }
  };

  const onFinishFailed = () => {
    openNotification('error', 'Error!', 'Set correct credentials');
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Log In
        </Button>
        <Link style={{ marginLeft: '5px' }} to="/register">
          Sign up
        </Link>
      </Form.Item>
    </Form>
  );
};
