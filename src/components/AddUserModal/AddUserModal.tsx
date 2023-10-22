import React from 'react';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { useCallback } from 'react';

import {
  BUTTON_ITEM_LAYOUT,
  USER_MODAL_RULES,
  FORM_ITEM_LAYOUT,
} from '../../constants/constants';
import { IUserCreate } from 'src/user/user.types';

type AddUserModalProps = {
  modalVisibility: boolean;
  setModalVisibility: (value: boolean) => void;
  submitCallback: (values: IUserCreate) => void;
};

export const AddUserModal = ({
  modalVisibility,
  setModalVisibility,
  submitCallback,
}: AddUserModalProps) => {
  const [form] = Form.useForm();

  const onFinish = useCallback(
    (values: IUserCreate) => {
      setModalVisibility(false);
      submitCallback(values);
      form.resetFields();
    },
    [setModalVisibility, submitCallback, form],
  );

  const onCancel = () => {
    setModalVisibility(false);
  };

  return (
    <Modal
      title="Create a new user"
      open={modalVisibility}
      afterClose={form.resetFields}
      footer={false}
      onCancel={onCancel}
    >
      <Form onFinish={onFinish} form={form} {...FORM_ITEM_LAYOUT}>
        <Form.Item
          id="email"
          label="Email"
          name="email"
          rules={USER_MODAL_RULES.email}
        >
          <Input />
        </Form.Item>
        <Form.Item
          id="password"
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item id="firstName" label="First Name" name="firstName">
          <Input />
        </Form.Item>
        <Form.Item id="middleName" label="Middle Name" name="middleName">
          <Input />
        </Form.Item>
        <Form.Item id="lastName" label="Last Name" name="lastName">
          <Input />
        </Form.Item>
        <Form.Item id="phone" label="Phone" name="phone">
          <Input />
        </Form.Item>
        <Divider />
        <Form.Item {...BUTTON_ITEM_LAYOUT}>
          <Button key="cancel" id="contact-modal-cancel-btn" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="primary"
            key="submit"
            id="contact-modal-submit-btn"
            htmlType="submit"
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
