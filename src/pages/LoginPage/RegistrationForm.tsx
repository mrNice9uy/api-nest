import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import {
  REGISTER_FORM_ITEM_LAYOUT,
  TAIL_FORM_ITEM_LAYOUT,
} from '../../constants/constants';
import { openNotification } from '../../utils/utils';
import { IUserCreate } from 'src/user/user.types';
import { createUser } from './LoginPage.api';

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: IUserCreate) => {
    try {
      await createUser(values);
      navigate('/services');
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

  return (
    <Form
      {...REGISTER_FORM_ITEM_LAYOUT}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      autoComplete="off"
    >
      <Form.Item label="First Name" name="firstName">
        <Input />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName">
        <Input />
      </Form.Item>
      <Form.Item label="Middle Name" name="middleName">
        <Input />
      </Form.Item>
      <Form.Item label="Phone" name="phone">
        <Input />
      </Form.Item>
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
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!'),
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
